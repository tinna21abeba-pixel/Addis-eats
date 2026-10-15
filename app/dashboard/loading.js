export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
          Addis Eats Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Loading Dashboard Data...
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Retrieving server-aggregated neighbourhood revenue and order statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">
          <div className="h-4 w-28 bg-zinc-800 rounded mb-3" />
          <div className="h-8 w-36 bg-zinc-700 rounded mb-2" />
          <div className="h-3 w-20 bg-zinc-800 rounded" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">
          <div className="h-4 w-24 bg-zinc-800 rounded mb-3" />
          <div className="h-8 w-28 bg-zinc-700 rounded mb-2" />
          <div className="h-3 w-32 bg-zinc-800 rounded" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">
          <div className="h-4 w-32 bg-zinc-800 rounded mb-3" />
          <div className="h-8 w-32 bg-zinc-700 rounded mb-2" />
          <div className="h-3 w-24 bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">
          <div className="h-5 w-48 bg-zinc-800 rounded mb-2" />
          <div className="h-3 w-32 bg-zinc-800 rounded mb-6" />
          <div className="h-80 w-full bg-zinc-800/60 rounded" />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">
          <div className="h-5 w-44 bg-zinc-800 rounded mb-2" />
          <div className="h-3 w-28 bg-zinc-800 rounded mb-6" />
          <div className="h-80 w-full bg-zinc-800/60 rounded" />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">
        <div className="h-5 w-48 bg-zinc-800 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-10 w-full bg-zinc-800 rounded" />
          <div className="h-10 w-full bg-zinc-800/60 rounded" />
          <div className="h-10 w-full bg-zinc-800/40 rounded" />
          <div className="h-10 w-full bg-zinc-800/30 rounded" />
        </div>
      </div>
    </div>
  );
}
