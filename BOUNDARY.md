# Addis Eats - Server and Client Boundary

| Component / File | Boundary | Purpose |
| :--- | :--- | :--- |
| `app/layout.js` | Server | Root layout shell, injects font variables and metadata, passes children into providers. |
| `app/page.js` | Server | Static landing hero and featured dish sections rendered directly on server. |
| `app/Providers.jsx` | Client | Context provider wrapper holding cart client state across routes. |
| `app/components/Header.jsx` | Client | Reads cart badge count and handles responsive navigation toggles. |
| `app/components/Footer.jsx` | Server | Static footer links and legal markup. |
| `app/menu/page.js` | Server | Awaits dish catalog from server store and passes seed data to explorer. |
| `app/menu/layout.js` | Server | Wraps menu routes with static sidebar navigation. |
| `app/menu/MenuSidebar.jsx` | Server | Renders dish navigation links on server. |
| `app/menu/MenuCounter.jsx` | Client | Isolated leaf holding client demonstration counter state. |
| `app/menu/MenuExplorer.jsx` | Client | Leaf component managing debounced search input, category filter, and display. |
| `app/menu/AddToCartButton.jsx` | Client | Leaf component handling onClick event and writing items to CartContext store. |
| `app/menu/[id]/page.js` | Server | Generates static params, metadata, JSON-LD, and renders dish view. |
| `app/cart/page.js` | Server | Shell layout container for cart display. |
| `app/cart/CartView.jsx` | Client | Interacts with cart store, line item removal, and subtotal calculation. |
| `app/checkout/page.js` | Server | Verifies active session on server before rendering checkout interface. |
| `app/checkout/CheckoutForm.jsx` | Client | Form state handling with useActionState, double-submit protection, and clearing cart on success. |
| `app/orders/page.js` | Server | Verifies session, queries scoped orders, and seeds initial data. |
| `app/orders/OrdersList.jsx` | Client | Displays seeded orders without initial spinner, formats with etb/when/relative, and polls status updates. |
| `app/orders/CancelOrderButton.jsx` | Client | Form submission for order cancellation with useActionState. |
| `app/orders/[id]/track/page.js` | Server | Seeds initial courier location, destination coordinates, and ETA on server. |
| `app/orders/[id]/track/OrderTracker.jsx` | Client | Listens to live SSE stream via EventSource, closes connection on unmount, and renders text details. |
| `app/orders/[id]/track/DeliveryMap.jsx` | Client | Leaflet map loaded with ssr:false, explicit height, and OpenStreetMap attribution. |
| `app/dashboard/page.js` | Server | Aggregates all orders on the server and provides demonstrable loading, empty, and error states. |
| `app/dashboard/RevenueByNeighbourhoodChart.jsx` | Client | Client leaf rendering high-contrast bar chart with baseline at 0 and accompanying data table. |
| `app/dashboard/OrdersOverTimeChart.jsx` | Client | Client leaf rendering orders velocity line chart and accompanying data table. |
| `app/dashboard/OrdersTable.jsx` | Client | Accessible orders table paged and sorted from URL parameters using Link elements. |
| `app/kitchen/page.js` | Server | Enforces kitchen staff role check and reads order queue. |
| `app/kitchen/KitchenBoard.jsx` | Client | Allows kitchen staff to trigger status transitions via server actions. |
| `app/signin/page.js` | Server | Renders sign-in shell with Suspense boundary. |
| `app/signin/SignInForm.jsx` | Client | Interactive sign-in form with open redirect prevention and role-selection triggers. |
