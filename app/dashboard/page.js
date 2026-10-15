import Link from "next/link";
import { getDashboardData } from "../lib/dashboard";
import RevenueByNeighbourhoodChart from "./RevenueByNeighbourhoodChart";
import OrdersOverTimeChart from "./OrdersOverTimeChart";
import OrdersTable from "./OrdersTable";
import DashboardLoading from "./loading";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Addis Eats",
  description: "Revenue by neighbourhood and orders over time analytics dashboard for Addis Eats."
};

export default async function DashboardPage({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const page = resolvedParams.page || "1";
  const sort = resolvedParams.sort || "createdAt";
  const order = resolvedParams.order || "desc";
  const state = resolvedParams.state || "";

  const data = await getDashboardData({ page, sort, order, state });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
            Performance &amp; Revenue Analytics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Addis Eats Dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Aggregated metrics for delivery neighbourhoods, order velocity, and transaction logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/orders"
            className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-medium transition"
          >
            My Orders View
          </Link>
          <Link
            href="/kitchen"
            className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 font-medium transition"
          >
            Kitchen Board
          </Link>
        </div>
      </div>

      <nav
        aria-label="Demonstration state switcher"
        className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl mb-8 text-xs"
      >
        <span className="font-semibold uppercase tracking-wider text-zinc-400">
          Demonstrate State:
        </span>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded border font-medium ${
              !state
                ? "bg-white text-black border-white font-bold"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Normal State
          </Link>
          <Link
            href="/dashboard?state=loading"
            className={`px-3 py-1.5 rounded border font-medium ${
              state === "loading"
                ? "bg-white text-black border-white font-bold"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Demonstrate Loading
          </Link>
          <Link
            href="/dashboard?state=empty"
            className={`px-3 py-1.5 rounded border font-medium ${
              state === "empty"
                ? "bg-white text-black border-white font-bold"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Demonstrate Empty
          </Link>
          <Link
            href="/dashboard?state=error"
            className={`px-3 py-1.5 rounded border font-medium ${
              state === "error"
                ? "bg-white text-black border-white font-bold"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Demonstrate Error
          </Link>
        </div>
      </nav>

      {data.state === "loading" && <DashboardLoading />}

      {data.state === "error" && (
        <section className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 sm:p-12 text-center my-8">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
            Demonstration State
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            Demonstrable Error State Active
          </h2>
          <p className="text-zinc-300 text-sm max-w-lg mx-auto mb-6">
            {data.error || "An error occurred while calculating order aggregations on the server."}
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-xs hover:bg-zinc-200 transition"
            >
              Return to Normal State
            </Link>
          </div>
        </section>
      )}

      {data.state === "empty" && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-12 text-center my-8">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
            Demonstration State
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            No Orders Recorded
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
            There are currently zero orders recorded in the system. Once customer orders are placed, aggregated neighbourhood revenue and time series will populate automatically.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/menu"
              className="px-5 py-2.5 bg-white text-black font-bold rounded-lg text-xs hover:bg-zinc-200 transition"
            >
              Browse Menu
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-zinc-800 border border-zinc-700 text-white font-medium rounded-lg text-xs hover:bg-zinc-700 transition"
            >
              Reset to Populated Dataset
            </Link>
          </div>
        </section>
      )}

      {data.state === "success" && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Total Revenue
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                ETB {data.totals.totalRevenue.toLocaleString()}
              </p>
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Across all active neighbourhoods
              </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Total Orders Placed
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {data.totals.totalOrders}
              </p>
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Historical order volume
              </span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Average Order Value
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                ETB {data.totals.averageOrderValue.toLocaleString()}
              </p>
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Revenue per transaction
              </span>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueByNeighbourhoodChart data={data.revenueByNeighbourhood} />
            <OrdersOverTimeChart data={data.ordersOverTime} />
          </div>

          <OrdersTable
            orders={data.pagedOrders}
            pagination={data.pagination}
            currentState={state}
          />
        </>
      )}
    </div>
  );
}
