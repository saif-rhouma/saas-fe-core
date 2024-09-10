import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));
// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
const OrderCreatePage = lazy(() => import('src/pages/dashboard/order/new'));
// Plan
const PlanListPage = lazy(() => import('src/pages/dashboard/plan/list'));
const PlanDetailsPage = lazy(() => import('src/pages/dashboard/plan/details'));
const PlanCreatePage = lazy(() => import('src/pages/dashboard/plan/new'));
const PlanEditPage = lazy(() => import('src/pages/dashboard/plan/edit'));
// Product
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
const ProductAddonsPage = lazy(() => import('src/pages/dashboard/product/addons'));
const ProductStockPage = lazy(() => import('src/pages/dashboard/product/stock'));
// Customer
const CustomerListPage = lazy(() => import('src/pages/dashboard/customers/list'));
// Payments
const PaymentsListPage = lazy(() => import('src/pages/dashboard/payments/list'));
// Reminders
const RemindersListPage = lazy(() => import('src/pages/dashboard/reminders/list'));
// Tickets
const TicketsListPage = lazy(() => import('src/pages/dashboard/tickets/list'));
const TicketsDetailsPage = lazy(() => import('src/pages/dashboard/tickets/details'));
// Staff
// const StaffListPage = lazy(() => import('src/pages/dashboard/reminders/list'));
// Reports;
const ReportsDailyListPage = lazy(() => import('src/pages/dashboard/reports/daily-list'));
const ReportsOrderListPage = lazy(() => import('src/pages/dashboard/reports/order-list'));
const ReportsPlanListPage = lazy(() => import('src/pages/dashboard/reports/plan-list'));
const ReportsStockListPage = lazy(() => import('src/pages/dashboard/reports/stock-list'));
// const ReportsCustomListPage = lazy(() => import('src/pages/dashboard/reports/custom-list'));
// Tools
// const ToolsListPage = lazy(() => import('src/pages/dashboard/reminders/list'));
// Order Status
const OrderStatus = lazy(() => import('src/pages/dashboard/order/status'));
// User
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

// App
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      { path: 'course', element: <OverviewCoursePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      { path: 'order-status', element: <OrderStatus /> },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'addons', element: <ProductAddonsPage /> },
          { path: 'stock', element: <ProductStockPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
          { path: 'new', element: <OrderCreatePage /> },
        ],
      },
      {
        path: 'plan',
        children: [
          { element: <PlanListPage />, index: true },
          { path: 'list', element: <PlanListPage /> },
          { path: ':id', element: <PlanDetailsPage /> },
          { path: 'new', element: <PlanCreatePage /> },
          { path: ':id/edit', element: <PlanEditPage /> },
        ],
      },
      {
        path: 'customer',
        children: [
          { element: <CustomerListPage />, index: true },
          { path: 'list', element: <CustomerListPage /> },
        ],
      },
      {
        path: 'payments',
        children: [
          { element: <PaymentsListPage />, index: true },
          { path: 'list', element: <PaymentsListPage /> },
        ],
      },
      {
        path: 'reminders',
        children: [
          { element: <RemindersListPage />, index: true },
          { path: 'list', element: <RemindersListPage /> },
        ],
      },
      {
        path: 'tickets',
        children: [
          { element: <TicketsListPage />, index: true },
          { path: 'list', element: <TicketsListPage /> },
          { path: ':id', element: <TicketsDetailsPage /> },
        ],
      },
      {
        path: 'staff',
        children: [
          { element: <PaymentsListPage />, index: true },
          { path: 'list', element: <PaymentsListPage /> },
        ],
      },
      {
        path: 'reports',
        children: [
          { element: <ReportsDailyListPage />, index: true },
          { path: 'daily', element: <ReportsDailyListPage /> },
          { path: 'order', element: <ReportsOrderListPage /> },
          { path: 'plan', element: <ReportsPlanListPage /> },
          { path: 'stock', element: <ReportsStockListPage /> },
          { path: 'custom', element: <ReportsDailyListPage /> },
        ],
      },
      {
        path: 'tools',
        children: [
          { element: <PaymentsListPage />, index: true },
          { path: 'account-setting', element: <PaymentsListPage /> },
          { path: 'financial-year', element: <PaymentsListPage /> },
          { path: 'master-setting', element: <PaymentsListPage /> },
        ],
      },
      { path: 'kanban', element: <KanbanPage /> },
    ],
  },
];
