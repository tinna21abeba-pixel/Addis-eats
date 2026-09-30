export default function Loading() {
  return (
    <div className="animate-pulse bg-white" role="status" aria-label="Loading menu">
      <div className="h-10 w-2/3 rounded-lg bg-gray-100" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl border border-gray-200 bg-gray-50" />
        ))}
      </div>
    </div>
  );
}
