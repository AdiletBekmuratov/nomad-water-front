import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ScrollToTop';
import RegisterForm from '@/pages/RegisterForm';
import ApplicationForm from '@/pages/ApplicationForm';
import OrderRegistration from '@/pages/OrderRegistration';
import OrderInfo from '@/pages/OrderInfo';

const Home = lazy(() => import('@/pages/Home'));
const Catalog = lazy(() => import('@/pages/Catalog'));
const Orders = lazy(() => import('@/pages/Orders'));
const BottlePage = lazy(() => import('@/pages/BottlePage'));

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
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/crm" element={<MainCrm />} />
            <Route path="/crm/favourite" element={<Favourite />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/application" element={<ApplicationForm />} />
            <Route path="/order" element={<OrderRegistration />} />
            <Route path="/orderinfo" element={<OrderInfo />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
