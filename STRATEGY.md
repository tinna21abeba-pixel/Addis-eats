# Addis Eats - Route Rendering Strategies

| Route | Strategy | Reason |
| :--- | :--- | :--- |
| `/` | Static (SSG) | Landing page content is static and identical for all visitors. |
| `/menu` | Incremental Static Regeneration (ISR - 60s) | Menu items and availability change periodically, benefiting from cached static performance with automated background revalidation. |
| `/menu/[id]` | Static Site Generation (SSG via `generateStaticParams`) | All dish IDs and item details are known ahead of time, allowing pre-rendering of individual pages at build time. |
| `/cart` | Static (Client-Hydrated) | The cart layout shell is static, while dynamic item state is managed client-side. |
| `/checkout` | Dynamic (Server-Rendered on Demand) | Requires reading request-time cookies, session credentials, and user-specific headers for processing orders. |
| `/orders` | Dynamic (Server-Rendered on Demand) | User-scoped private orders queried on demand for authenticated session. |
| `/orders/[id]/track` | Dynamic (Server-Rendered on Demand) | Seeds initial courier coordinates on the server and streams live SSE position updates on the client. |
| `/dashboard` | Dynamic (Server-Rendered on Demand) | Aggregates order analytics, metrics, and URL paged/sorted master records on demand. |
| `/kitchen` | Dynamic (Server-Rendered on Demand) | Restricted operational kitchen queue filtered by kitchen role. |
| `/home` | Static (SSG) | Static informational welcome page that does not depend on request parameters or external mutations. |
