# CampusCart Admin Hub - API Documentation

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elinamka/campuscart-admin-hub.git
   cd campuscart-admin-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

5. **Configure environment variables**

   Backend (.env):
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/campuscart"
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

   Frontend (.env.local):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

6. **Setup Database**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

7. **Start the servers**

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - Health Check: http://localhost:3001/health

---

## API Endpoints

### Orders
```
GET    /api/orders              - Get all orders (paginated)
POST   /api/orders              - Create new order
GET    /api/orders/:id          - Get single order
PATCH  /api/orders/:id          - Update order
DELETE /api/orders/:id          - Delete order
GET    /api/orders/customer/:id - Get customer orders
```

### Customers
```
GET    /api/customers           - Get all customers
POST   /api/customers           - Create customer
GET    /api/customers/:id       - Get customer
PATCH  /api/customers/:id       - Update customer
DELETE /api/customers/:id       - Delete customer
```

### Vendors
```
GET    /api/vendors             - Get all vendors
POST   /api/vendors             - Create vendor
GET    /api/vendors/:id         - Get vendor
PATCH  /api/vendors/:id         - Update vendor
DELETE /api/vendors/:id         - Delete vendor
```

### Payments
```
GET    /api/payments            - Get all payments
POST   /api/payments            - Create payment
GET    /api/payments/:id        - Get payment
PATCH  /api/payments/:id        - Update payment
```

### Analytics
```
GET    /api/analytics/dashboard           - Dashboard metrics
GET    /api/analytics/revenue-trends      - Revenue trends
GET    /api/analytics/vendor-performance  - Vendor performance
GET    /api/analytics/customer-growth     - Customer growth
```

### Activities
```
GET    /api/activities          - Get all activities
GET    /api/activities/recent   - Get recent activities
```

---

## Project Structure

```
campuscart-admin-hub/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── vendors/
│   │   ├── payments/
│   │   ├── schedules/
│   │   └── analytics/
│   ├── components/
│   │   ├── layouts/
│   │   ├── navigation/
│   │   ├── ui/
│   │   ├── charts/
│   │   ├── pages/
│   │   └── sections/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── services/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── .env.example
└── docs/
```

---

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons
- Axios

### Backend
- Express.js
- Node.js
- PostgreSQL
- Prisma ORM
- TypeScript

---

## Features

✅ Responsive Dashboard with KPI cards
✅ Order Management (CRUD, filtering, pagination)
✅ Customer Management (profiles, history, search)
✅ Vendor Management (database, ratings, performance)
✅ Payment Tracking (Mobile Money, Paystack)
✅ Analytics & Reports
✅ Live Activity Feed
✅ Delivery Scheduler
✅ Real-time Data Visualization

---

## Database Schema

### Models
- **User** - Admin/Staff accounts
- **Customer** - Student profiles with order history
- **Vendor** - Food vendors with ratings
- **Order** - Customer orders with status tracking
- **Payment** - Payment transactions
- **Delivery Schedule** - Delivery time windows
- **Activity** - Event logs for real-time feed
- **Automation** - Workflow automation

---

## Development

### Code Style
- ESLint for linting
- TypeScript for type safety
- Prettier for code formatting

### Commands

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

**Backend:**
```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript
npm run start            # Start production server
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

---

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Railway/Heroku)
```bash
git push origin main
# Automatic deployment triggered
```

---

## License

MIT

---

## Support

For issues and feature requests, please open an issue on GitHub.
