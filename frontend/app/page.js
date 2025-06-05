'use client'

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { use, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const context = useContext(AuthContext);
  const user = context ? context.user : null;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/docs');
    }
  }, [user])
  return (
    <div className='p-20 bg-[var(--background)] flex-col items-center text-5xl min-h-dvh'>
      <div className='text-end mb-10'>FADE IN:</div>
      <div className='mb-10'>INT. WRITER'S ROOM - DAY</div>
      <div>
        Welcome to <strong>Screenwriter.</strong> Click <button className='bg-black text-white p-2 rounded hover:bg-gray-800'><Link href={'/auth'}>Get Started</Link></button> to start writing.
      </div>
    </div>
  )
}