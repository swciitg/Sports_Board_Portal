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

  useEffect( () => {
    // Fetch the data from the backend
  const fetchData = async () => {
    await axios.get(`${process.env.API_BASE_URL}/home`)
    .then((response) => {
      setData(response.data); // Set the combined response data
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });

    fetchData();
  }
  }, []);

  return { data, loading, error };
};
