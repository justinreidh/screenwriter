import Editor from "@/components/editor";
import Link from "next/link";

export default function Write({ params }) {
    const { screenplayID } = params; // Destructure screenplayID from params

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Editing Screenplay ID: {screenplayID}
            </h1>
            <Editor />
        </div>
    );
}