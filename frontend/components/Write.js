'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Editor from '@/components/editor';
import { AuthContext } from '@/context/AuthContext';

export default function Write({ screenplayID }) {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [screenplay, setScreenplay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return; 

    if (!user || !token) {
      setError('Please log in to edit screenplays');
      setLoading(false);
      return;
    }

    const fetchScreenplay = async () => {
      if (screenplayID) {
        try {
          const res = await axios.get(`http://localhost:4000/api/docs/${screenplayID}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setScreenplay(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load screenplay');
        }
      }
      setLoading(false);
    };

    fetchScreenplay();
  }, [screenplayID, user, token, authLoading]);

  if (authLoading || loading) {
    return <div className='p-4'>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <Editor screenplay={screenplay} screenplayID={screenplayID} />
    </div>
  );
}