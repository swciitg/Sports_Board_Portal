import { useEffect, useState } from 'react';
import axios from 'axios';

export const useEventPageData = () => {
  const [data, setData] = useState({
    aboutData: [],
    facilities: [],
    teamMember: [],
    homepage: [],
  });
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/allevents`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
    };
    fetchData();
  }, []);
  return { data, error };
};