import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAnnouncementsPageData = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, loading };
};