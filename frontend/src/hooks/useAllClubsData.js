import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * The club list is read by the homepage grid, the all-clubs page and the footer, which
 * can be mounted at the same time. Share one in-flight request between them (this also
 * absorbs StrictMode's double effect invocation in development).
 */
let clubsRequest = null;

const fetchClubs = () => {
  if (!clubsRequest) {
    clubsRequest = axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/allclubs`)
      .then((response) => response.data)
      .catch((err) => {
        clubsRequest = null; // let a later mount retry
        throw err;
      });
  }
  return clubsRequest;
};

/**
 * GET /allClubs -> { club: [{ _id, name, img, safeName }], homepage: [{ _id, clubheroimg }] }
 */
export const useAllClubsData = () => {
  const [data, setData] = useState({ club: [], homepage: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchClubs()
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error, loading };
};

/**
 * Link target for a club. The backend matches /club/:name on `safeName`, which is
 * the club name with spaces intact ("Badminton Club") — not a slug. Fall back to the
 * raw name for as long as /allClubs is deployed without safeName in its projection.
 */
export const clubSlug = (club) => encodeURIComponent(club?.safeName || club?.name || "");
