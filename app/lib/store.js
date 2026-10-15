import "server-only";
import dishes from "../data/dishes";
import initialSeedOrders from "./seedOrders";

const knownNeighbourhoods = [
  "Bole",
  "Kazanchis",
  "Piazza",
  "Sarbet",
  "CMC",
  "Kirkos",
  "Gerji",
  "Arada",
  "Yeka",
  "Lideta"
];

export function extractNeighbourhood(address) {
  if (!address || typeof address !== "string") return "Bole";
  const found = knownNeighbourhoods.find((n) =>
    address.toLowerCase().includes(n.toLowerCase())
  );
  return found || "Bole";
}

globalThis.__addisEatsDb ??= {
  orders: [...initialSeedOrders],
  nextId: 1033
};

const db = globalThis.__addisEatsDb;

if (!db.orders || db.orders.length === 0) {
  db.orders = [...initialSeedOrders];
  db.nextId = 1033;
}

export function listDishes(category) {
  if (!category || category === "All") return dishes;
  return dishes.filter(
    (d) => d.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchDishes(category, query) {
  let result = listDishes(category);
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }
  return result;
}

export function findDish(id) {
  return dishes.find((d) => d.id === Number(id));
}

export function insertOrder({ userId, name, phone, address, note, items }) {
  const lines = items.map(({ dishId, quantity }) => {
    const dish = findDish(dishId);
    return { dishId, name: dish.name, price: dish.price, quantity };
  });
  const neighbourhood = extractNeighbourhood(address);
  const order = {
    id: `ORD-${db.nextId++}`,
    userId,
    name,
    phone,
    address,
    neighbourhood,
    note: note ?? "",
    items: lines,
    total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.orders.unshift(order);
  return order;
}

export const findOrder = (id) => db.orders.find((o) => o.id === id);
export const listOrders = () => db.orders;
export const listOrdersByUser = (userId) =>
  db.orders.filter((o) => o.userId === userId);
export const getOrdersFor = (userId) => listOrdersByUser(userId);

export function updateOrderStatusInDb(id, status) {
  const order = findOrder(id);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
}

export function toPublicOrder(o) {
  return { id: o.id, items: o.items, total: o.total, status: o.status, createdAt: o.createdAt };
}

export function toOwnerOrder(o) {
  const { userId, ...rest } = o;
  return rest;
}