import Link from "next/link";

export default function OrdersTable({
  orders = [],
  pagination = {
    page: 1,
    pageSize: 8,
    totalOrders: 0,
    totalPages: 1,
    sort: "createdAt",
    order: "desc"
  },
  currentState = ""
}) {
  const { page, totalPages, totalOrders, sort, order } = pagination;

  function buildUrl(newPage, newSort, newOrder) {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    params.set("sort", newSort || sort);
    params.set("order", newOrder || order);
    if (currentState) {
      params.set("state", currentState);
    }
    return `/dashboard?${params.toString()}`;
  }

  function getSortUrl(columnKey) {
    let nextOrder = "asc";
    if (sort === columnKey) {
      nextOrder = order === "asc" ? "desc" : "asc";
    } else if (columnKey === "total" || columnKey === "createdAt") {
      nextOrder = "desc";
    }
    return buildUrl(1, columnKey, nextOrder);
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Orders Master Table</h2>
          <span className="text-xs text-zinc-400 block mt-1">
            Paged and sorted directly from URL query parameters.
          </span>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          Showing {orders.length} of {totalOrders} total orders
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-200 border-collapse">
          <caption className="text-left text-xs uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
            All Addis Eats Orders Records
          </caption>
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800/80">
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("id")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Order ID {sort === "id" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("name")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Customer {sort === "name" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("neighbourhood")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Neighbourhood {sort === "neighbourhood" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                Items Summary
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("total")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Total (ETB) {sort === "total" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("status")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Status {sort === "status" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
              <th scope="col" className="py-3 px-3 font-semibold text-white">
                <Link
                  href={getSortUrl("createdAt")}
                  className="hover:text-amber-400 underline decoration-zinc-600 underline-offset-4"
                >
                  Date {sort === "createdAt" ? (order === "asc" ? "[Asc]" : "[Desc]") : ""}
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-500 text-sm">
                  No orders match the current criteria.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-zinc-800/40">
                  <th scope="row" className="py-3 px-3 font-mono text-xs text-white">
                    {o.id}
                  </th>
                  <td className="py-3 px-3 font-medium text-white">{o.name}</td>
                  <td className="py-3 px-3">{o.neighbourhood}</td>
                  <td className="py-3 px-3 text-zinc-300">{o.itemsSummary}</td>
                  <td className="py-3 px-3 font-bold text-white">
                    ETB {Number(o.total).toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-xs border border-zinc-700 bg-zinc-800 uppercase font-bold text-zinc-300">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-400 whitespace-nowrap">
                    {new Date(o.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav
        aria-label="Orders Table Pagination"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800 mt-4 text-sm"
      >
        <span className="text-zinc-400 text-xs">
          Page {page} of {totalPages} (Total: {totalOrders} orders)
        </span>

        <div className="flex items-center gap-1.5 flex-wrap">
          {page > 1 ? (
            <Link
              href={buildUrl(page - 1)}
              className="px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-semibold"
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-600 text-xs font-semibold cursor-not-allowed select-none"
            >
              Previous
            </span>
          )}

          {pageNumbers.map((p) => (
            <Link
              key={p}
              href={buildUrl(p)}
              className={`px-3 py-1.5 rounded border text-xs font-semibold ${
                p === page
                  ? "border-white bg-white text-black font-bold"
                  : "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {p}
            </Link>
          ))}

          {page < totalPages ? (
            <Link
              href={buildUrl(page + 1)}
              className="px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 text-xs font-semibold"
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-600 text-xs font-semibold cursor-not-allowed select-none"
            >
              Next
            </span>
          )}
        </div>
      </nav>
    </section>
  );
}
