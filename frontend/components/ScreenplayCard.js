export default function ScreenplayCard({ screenplay }) {
    return (
      <a
        href={`/write/${screenplay.id}`}
        className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-800">{screenplay.title}</h3>
      
      </a>
    );
  }