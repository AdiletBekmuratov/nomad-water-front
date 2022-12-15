import ScrollToTop from '@/components/ScrollToTop';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import Login from '@/pages/admin/Login';
import OrderInfo from '@/pages/OrderInfo';
import OrderRegistration from '@/pages/OrderRegistration';
import UserAppeal from '@/pages/UserAppeal';
import WarehouseAppeal from '@/pages/WarehouseAppeal';
import Warehouses from '@/pages/Warehouses';
import { getMe } from '@/redux/slices/auth';
import ProtectedRoute from './ProtectedRoute';
import Loader from '@/components/Loader';
import AdminWarehouses from '@/pages/admin/AdminWarehouses';

const Landing = lazy(() => import('@/pages/Landing'));
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
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getMe());
    };

    getUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/login"
              element={
                <ProtectedRoute isAllowed={!user} redirectPath="/admin">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/warehouses" element={<AdminWarehouses />} />
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
