import ScrollToTop from '@/components/ScrollToTop';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Loader from '@/components/Landing/Loader';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getMe } from '@/redux/slices/auth';

import OrderInfo from '@/pages/OrderPages/OrderInfo';
import UserAppeal from '@/pages/UserAppeal';
import WarehouseAppeal from '@/pages/WarehouseAppeal';
import Warehouses from '@/pages/Warehouses';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminCategory from '@/pages/admin/AdminCategory';
import { AcceptOrder } from '@/pages/Couriers/AcceptOrder';
import { AcceptedOrders } from '@/pages/Couriers/AcceptedOrders';

const Landing = lazy(() => import('@/pages/Landing'));

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminAllUsers = lazy(() => import('@/pages/admin/AdminAllUsers'));
const AdminCouriers = lazy(() => import('@/pages/admin/AdminCouriers'));
const AdminWorkers = lazy(() => import('@/pages/admin/AdminWorkers'));
const AdminWarehouses = lazy(() => import('@/pages/admin/AdminWarehouses'));
const RegisterLinkEmployee = lazy(() => import('@/pages/RegisterLinkEmployee'));
const NoPage = lazy(() => import('@/pages/admin/NoPage'));

const Catalog = lazy(() => import('@/pages/catalog/Catalog'));
const BottlePage = lazy(() => import('@/pages/catalog/BottlePage'));
const Orders = lazy(() => import('@/pages/OrderPages/Orders'));
const OrderCreate = lazy(() => import('@/pages/OrderPages/OrderCreate'));

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const Courier = lazy(() => import('@/pages/Couriers/Courier'));
const Employee = lazy(() => import('@/pages/Employee/Employee'));
const UserPage = lazy(() => import('@/pages/User/UserPage'));
const MyFavorite = lazy(() => import('@/pages/catalog/MyFavorite'));

const RequestsUser = lazy(() => import('@/pages/catalog/RequestsUser'));

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
            {/*вход юзер */}
            <Route path="/login/user" element={<LoginPage />} />
            {/* личная страница юзера */}
            <Route path="/userPage" element={<UserPage />} />
            {/* личная страница диспечера*/}
            <Route
              path="/employee"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_EMPLOYEE'} redirectPath="/catalog">
                  <Employee />
                </ProtectedRoute>
              }
            />
            {/* личная страница курьера */}
            <Route
              path="/courier"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_COURIER'} redirectPath="/catalog">
                  <AcceptedOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/myFavorite" element={<MyFavorite />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<BottlePage />} />
            <Route
              path="/myOrders"
              element={
                <ProtectedRoute
                  isAllowed={user?.role === 'ROLE_USER'}
                  redirectPath="/courier/orders">
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/order" element={<OrderCreate />} />
            <Route path="/orderinfo" element={<OrderInfo />} />

            <Route
              path="/courier/orders"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_COURIER'} redirectPath="/catalog">
                  <Courier />
                </ProtectedRoute>
              }
            />

            {/**************************************************************************************** */}
            {/*вход админ */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* страница регистрации по сгенерированным ссылкам */}
            <Route path="/register/employee/*" element={<RegisterLinkEmployee />} />
            <Route
              path="/admin/allUsers"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminAllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/workers"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminWorkers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/couriers"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminCouriers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/warehouses"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminWarehouses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/category"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminCategory />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/*" element={<NoPage />} />

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
