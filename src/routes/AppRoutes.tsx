import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ScrollToTop';

import UserAppeal from '@/pages/UserAppeal';
import OrderRegistration from '@/pages/OrderRegistration';
import OrderInfo from '@/pages/OrderInfo';
import TableExample from '@/pages/TableExample';
import Warehouses from '@/pages/warehouses';
import WarehouseAppeal from '@/pages/WarehouseAppeal';

const Lending = lazy(() => import('@/pages/Lending'));
const Admin = lazy(() => import('@/pages/Admin'));
const NoAuthAdmin = lazy(() => import('@/pages/NoAuthAdmin'));
const Catalog = lazy(() => import('@/pages/Catalog'));
const Orders = lazy(() => import('@/pages/Orders'));
const BottlePage = lazy(() => import('@/pages/BottlePage'));
const RequestsUser = lazy(() => import('@/pages/RequestsUser'));
const Users = lazy(() => import('@/pages/Users'));
const UserPage = lazy(() => import('@/pages/UserPage'));
const MyFavourite = lazy(() => import('@/pages/MyFavourite'));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      }>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Lending />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/*" element={<NoAuthAdmin />} />

            <Route path="/myFavourite" element={<MyFavourite />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<BottlePage />} />

            <Route path="/order" element={<OrderRegistration />} />
            <Route path="/myOrders" element={<Orders />} />
            <Route path="/orderinfo" element={<OrderInfo />} />

            <Route path="/users" element={<Users />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/requestsUser" element={<RequestsUser />} />

            <Route path="/table" element={<TableExample />} />
            <Route path="/appeal" element={<UserAppeal />} />

            <Route path="/warehouse" element={<Warehouses />} />
            <Route path="/warehouse/:id" element={<WarehouseAppeal />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
