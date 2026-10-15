"use client";

export default function RevenueByNeighbourhoodChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold tracking-tight">Revenue by Neighbourhood</h2>
        <span className="text-xs text-zinc-400 block mt-1">Unit: Ethiopian Birr (ETB)</span>
        <div className="h-80 flex items-center justify-center text-zinc-500 text-sm">
          No neighbourhood revenue data available.
        </div>
      </section>
    );
  }

  const rawMax = Math.max(...data.map((d) => d.revenue), 1000);
  const maxScale = Math.ceil(rawMax / 10000) * 10000;
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  const ticks = [
    maxScale,
    Math.round(maxScale * 0.75),
    Math.round(maxScale * 0.5),
    Math.round(maxScale * 0.25),
    0
  ];

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Revenue by Neighbourhood</h2>
            <span className="text-xs text-zinc-400 block mt-1">
              Unit: Ethiopian Birr (ETB) | Baseline: 0 ETB
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Total: ETB {totalRevenue.toLocaleString()}
          </span>
        </div>

        <div className="h-80 w-full relative flex pt-6 pb-8 border-b-2 border-zinc-300">
          <div className="w-24 shrink-0 flex flex-col justify-between text-right pr-3 text-[11px] font-mono text-zinc-400 select-none">
            {ticks.map((t) => (
              <span key={t} className="leading-none">
                ETB {t.toLocaleString()}
              </span>
            ))}
          </div>

          <div className="flex-1 relative flex items-end justify-around gap-2 sm:gap-4 pl-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none">
              {ticks.map((t) => (
                <div key={t} className="w-full border-t border-zinc-800/80" />
              ))}
            </div>

            {data.map((item) => {
              const heightPercent = Math.min(
                100,
                Math.max(2, Math.round((item.revenue / maxScale) * 100))
              );

              return (
                <div
                  key={item.neighbourhood}
                  className="flex-1 max-w-[68px] h-full flex flex-col justify-end items-center relative z-10 group"
                >
                  <div className="text-center mb-1">
                    <span className="block text-[11px] font-bold text-white font-mono leading-tight whitespace-nowrap">
                      ETB {item.revenue.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-zinc-400 leading-tight">
                      {item.orderCount} orders
                    </span>
                  </div>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-zinc-200 border-2 border-white rounded-t-sm transition-all hover:bg-white"
                  />

                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <span className="text-xs font-semibold text-zinc-200 block">
                      {item.neighbourhood}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="w-full text-left text-sm text-zinc-200 border-collapse">
          <caption className="text-left text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Revenue by Neighbourhood Data Table
          </caption>
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800/60">
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Neighbourhood</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Revenue (ETB)</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Orders Count</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Share of Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((item) => {
              const share =
                totalRevenue > 0
                  ? `${Math.round((item.revenue / totalRevenue) * 100)}%`
                  : "0%";
              return (
                <tr key={item.neighbourhood} className="hover:bg-zinc-800/40">
                  <th scope="row" className="py-2 px-3 font-medium text-white">{item.neighbourhood}</th>
                  <td className="py-2 px-3">ETB {item.revenue.toLocaleString()}</td>
                  <td className="py-2 px-3">{item.orderCount}</td>
                  <td className="py-2 px-3">{share}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
