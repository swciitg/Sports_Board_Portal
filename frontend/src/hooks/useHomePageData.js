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

  useEffect(() => {
    // Fetch the data from the backend
    axios.get('http://localhost:8000/api/home')
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
