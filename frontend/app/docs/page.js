'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ScreenplayCard from '@/components/ScreenplayCard';

export default function Documents() {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [screenplays, setScreenplays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!user || !token) {
      setError('Please log in to view documents');
      setLoading(false);
      return;
    }

    const fetchScreenplays = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/docs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScreenplays(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchScreenplays();
  }, [user, token, authLoading]);

  const createNewScreenplay = async () => {
    if (!user || !token) {
      setError('Please log in to create a screenplay');
      return;
    }

    setCreating(true);
    setError(null);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/docs`,
        {
          title: 'Untitled Screenplay',
          content: {
            type: 'doc',
            content: [
              {
                type: 'sceneHeading',
                content: [{ type: 'text', text: 'INT. LOCATION - DAY' }],
              },
              {
                type: 'action',
                content: [{ type: 'text', text: 'Start your screenplay here.' }],
              },
            ],
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/write/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create screenplay');
    } finally {
      setCreating(false);
    }
  };

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Your Documents</h1>
      <button
        onClick={createNewScreenplay}
        disabled={creating}
        className={`mb-4 px-4 py-2 bg-blue-500 text-white rounded ${creating ? 'opacity-50' : ''}`}
      >
        {creating ? 'Creating...' : 'Create New Screenplay'}
      </button>
      {screenplays.length === 0 ? (
        <p>No screenplays yet. Create one to get started!</p>
      ) : (
        <ul className="space-y-2">
          {screenplays.map((screenplay) => (
            <li key={screenplay.id}>
              <ScreenplayCard screenplay={screenplay}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}