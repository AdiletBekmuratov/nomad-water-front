import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ScrollToTop';
import RegisterForm from '@/pages/RegisterForm';
import ApplicationForm from '@/pages/ApplicationForm';
import OrderRegistration from '@/pages/OrderRegistration';
import OrderInfo from '@/pages/OrderInfo';

//const Home = lazy(() => import('@/pages/Home'));
const MainCrm = lazy(() => import('@/pages/MainCrm'));
const Orders = lazy(() => import('@/pages/Orders'));
const OrderPage = lazy(() => import('@/pages/OrderPage'));

const AppRoutes = () => {
  const [items, setItems] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  // const addUser = async (obj: any) => {
  //   try {
  //     const { data } = await axios.post('https://62b2813420cad3685c8edbad.mockapi.io/cart', obj);
  //     setItems((prev) => [...prev, data]);
  //   } catch (err) {
  //     alert('Не удалось добавить вас в базу');
  //     console.error(err);
  //   }
  // };
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
