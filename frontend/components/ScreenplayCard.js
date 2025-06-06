export default function ScreenplayCard({ screenplay }) {
  const updatedAt = new Date(screenplay.updatedAt);
  const createdAt = new Date(screenplay.createdAt)
  function formatDate(date) {
    return date.toLocaleDateString('en-us', {day:'numeric', month:'long', year:'numeric'})
  }
  const formattedDate = formatDate(updatedAt)
  const formattedCreate = formatDate(createdAt)
    return (
      <a
        href={`/write/${screenplay.id}`}
        className="flex flex-col items-start p-4 bg-white outline-1 rounded-lg shadow-md hover:shadow-lg transition-shadow w-100"
      >
        <h3 className="text-lg font-semibold text-gray-800">{screenplay.title}</h3>
        <h3>Created on: {formattedCreate}</h3>
        <h3>Last updated on: {formattedDate}</h3>
      
      </a>
    );
  }