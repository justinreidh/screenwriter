import Link from "next/link";
import ScreenplayCard from "@/components/ScreenplayCard";

export default function Docs() {
    const screenplays = [
        { id: 1, title: "The Midnight Heist", updated: "2025-04-01" },
        { id: 2, title: "Echoes of Tomorrow", updated: "2025-03-28" },
        { id: 3, title: "Desert Shadows", updated: "2025-03-15" },
        { id: 4, title: "Whispers in the Wind", updated: "2025-02-20" },
      ];

    return (
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Screenplay Projects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenplays.map((screenplay) => (
              <ScreenplayCard key={screenplay.id} screenplay={screenplay} />
            ))}
          </div>
        </div>
    )
}