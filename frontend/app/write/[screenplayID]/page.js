'use client';

import { useParams } from 'next/navigation';
import Write from '@/components/Write';

export default function WritePage() {
  const params = useParams();
  const screenplayID = params?.screenplayID;

  return <Write screenplayID={screenplayID} />;
}