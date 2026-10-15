import "server-only";
import { listOrders, extractNeighbourhood } from "./store";

export async function getDashboardData({
  page = 1,
  sort = "createdAt",
  order = "desc",
  state = ""
} = {}) {
  if (state === "error") {
    return {
      state: "error",
      error: "Simulated aggregation failure on the server."
    };
  }

  if (state === "loading") {
    return {
      state: "loading"
    };
  }

  if (state === "empty") {
    return {
      state: "empty",
      revenueByNeighbourhood: [],
      ordersOverTime: [],
      pagedOrders: [],
      pagination: {
        page: 1,
        pageSize: 8,
        totalOrders: 0,
        totalPages: 0,
        sort,
        order
      },
      totals: {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0
      }
    };
  }

  const allOrders = listOrders();

  if (!allOrders || allOrders.length === 0) {
    return {
      state: "empty",
      revenueByNeighbourhood: [],
      ordersOverTime: [],
      pagedOrders: [],
      pagination: {
        page: 1,
        pageSize: 8,
        totalOrders: 0,
        totalPages: 0,
        sort,
        order
      },
      totals: {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0
      }
    };
  }

  let totalRevenue = 0;
  const neighbourhoodMap = {};
  const dateMap = {};

  for (const o of allOrders) {
    totalRevenue += o.total;

    const n = o.neighbourhood || extractNeighbourhood(o.address);
    if (!neighbourhoodMap[n]) {
      neighbourhoodMap[n] = { neighbourhood: n, revenue: 0, orderCount: 0 };
    }
    neighbourhoodMap[n].revenue += o.total;
    neighbourhoodMap[n].orderCount += 1;

    const dateKey = o.createdAt ? o.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
    if (!dateMap[dateKey]) {
      dateMap[dateKey] = { date: dateKey, orderCount: 0, revenue: 0 };
    }
    dateMap[dateKey].orderCount += 1;
    dateMap[dateKey].revenue += o.total;
  }

  const revenueByNeighbourhood = Object.values(neighbourhoodMap).sort(
    (a, b) => b.revenue - a.revenue
  );

  const ordersOverTime = Object.values(dateMap)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => ({
      date: item.date,
      label: new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      orderCount: item.orderCount,
      revenue: item.revenue
    }));

  const sortedOrders = [...allOrders].sort((a, b) => {
    let valA;
    let valB;

    if (sort === "id") {
      valA = a.id;
      valB = b.id;
    } else if (sort === "name") {
      valA = (a.name || "").toLowerCase();
      valB = (b.name || "").toLowerCase();
    } else if (sort === "neighbourhood") {
      valA = (a.neighbourhood || "").toLowerCase();
      valB = (b.neighbourhood || "").toLowerCase();
    } else if (sort === "total") {
      valA = Number(a.total) || 0;
      valB = Number(b.total) || 0;
    } else if (sort === "status") {
      valA = (a.status || "").toLowerCase();
      valB = (b.status || "").toLowerCase();
    } else {
      valA = new Date(a.createdAt || 0).getTime();
      valB = new Date(b.createdAt || 0).getTime();
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  const pageSize = 8;
  const totalOrders = sortedOrders.length;
  const totalPages = Math.ceil(totalOrders / pageSize) || 1;
  const parsedPage = parseInt(page, 10) || 1;
  const safePage = Math.max(1, Math.min(parsedPage, totalPages));
  const startIndex = (safePage - 1) * pageSize;
  const pageSlice = sortedOrders.slice(startIndex, startIndex + pageSize);

  const pagedOrders = pageSlice.map((o) => ({
    id: o.id,
    name: o.name,
    neighbourhood: o.neighbourhood || extractNeighbourhood(o.address),
    itemsSummary: (o.items || []).map((i) => `${i.quantity}x ${i.name}`).join(", "),
    total: o.total,
    status: o.status,
    createdAt: o.createdAt
  }));

  const totals = {
    totalRevenue,
    totalOrders,
    averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
  };

  return {
    state: "success",
    revenueByNeighbourhood,
    ordersOverTime,
    pagedOrders,
    pagination: {
      page: safePage,
      pageSize,
      totalOrders,
      totalPages,
      sort,
      order
    },
    totals
  };
}
