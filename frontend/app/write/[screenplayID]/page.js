'use client';

import { useParams } from 'next/navigation';
import Editor from "@/components/editor";

export default function Write() {
    const params = useParams();
    const screenplayID = params?.screenplayID;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Editing Screenplay ID: {screenplayID}
            </h1>
            <Editor />
        </div>
    );
}
