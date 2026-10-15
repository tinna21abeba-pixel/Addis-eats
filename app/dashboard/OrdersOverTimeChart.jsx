"use client";

export default function OrdersOverTimeChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold tracking-tight">Orders Over Time</h2>
        <span className="text-xs text-zinc-400 block mt-1">Unit: Orders</span>
        <div className="h-80 flex items-center justify-center text-zinc-500 text-sm">
          No time series order data available.
        </div>
      </section>
    );
  }

  const rawMax = Math.max(...data.map((d) => d.orderCount), 4);
  const maxScale = Math.ceil(rawMax / 2) * 2;
  const totalOrders = data.reduce((sum, d) => sum + d.orderCount, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);

  const ticks = [
    maxScale,
    Math.round(maxScale * 0.75),
    Math.round(maxScale * 0.5),
    Math.round(maxScale * 0.25),
    0
  ];

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingY * 2;

  const points = data.map((d, index) => {
    const x =
      data.length > 1
        ? paddingX + (index / (data.length - 1)) * usableWidth
        : svgWidth / 2;
    const y =
      svgHeight -
      paddingY -
      (d.orderCount / maxScale) * usableHeight;
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Orders Over Time</h2>
            <span className="text-xs text-zinc-400 block mt-1">
              Unit: Orders | Baseline: 0 Orders
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Total Orders: {totalOrders} (ETB {totalRevenue.toLocaleString()})
          </span>
        </div>

        <div className="h-80 w-full relative flex pt-4 pb-6 border-b-2 border-zinc-300">
          <div className="w-20 shrink-0 flex flex-col justify-between text-right pr-3 text-[11px] font-mono text-zinc-400 select-none">
            {ticks.map((t) => (
              <span key={t} className="leading-none">
                {t} orders
              </span>
            ))}
          </div>

          <div className="flex-1 relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {ticks.map((t) => {
                const yPos =
                  svgHeight - paddingY - (t / maxScale) * usableHeight;
                return (
                  <line
                    key={t}
                    x1="0"
                    y1={yPos}
                    x2={svgWidth}
                    y2={yPos}
                    stroke="#27272a"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              <path
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((p) => (
                <g key={p.date}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill="#18181b"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {p.orderCount} orders
                  </text>
                  <text
                    x={p.x}
                    y={svgHeight}
                    textAnchor="middle"
                    fill="#a1a1aa"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {p.label || p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="w-full text-left text-sm text-zinc-200 border-collapse">
          <caption className="text-left text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Orders Over Time Data Table
          </caption>
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800/60">
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Date</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Orders Count</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Revenue (ETB)</th>
              <th scope="col" className="py-2.5 px-3 font-semibold text-white">Average Order Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((item) => {
              const avg =
                item.orderCount > 0
                  ? `ETB ${Math.round(item.revenue / item.orderCount).toLocaleString()}`
                  : "ETB 0";
              return (
                <tr key={item.date} className="hover:bg-zinc-800/40">
                  <th scope="row" className="py-2 px-3 font-medium text-white">{item.label || item.date}</th>
                  <td className="py-2 px-3">{item.orderCount}</td>
                  <td className="py-2 px-3">ETB {item.revenue.toLocaleString()}</td>
                  <td className="py-2 px-3">{avg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
