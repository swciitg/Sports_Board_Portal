import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHomePageData = () => {
  const [data, setData] = useState({
    aboutData: [],
    facilities: [],
    teamMember: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    // Fetch the data from the backend
   const response = await axios.get(`${process.env.API_BASE_URL}/home`)
      .then((response) => {
        setData(response.data); // Set the combined response data
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
