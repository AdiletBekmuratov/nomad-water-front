import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'react-hot-toast';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getMe } from '@/redux/slices/auth';

import Loader from '@/components/Landing/Loader';
import ScrollToTop from '@/components/ScrollToTop';

import OrderInfo from '@/pages/OrderPages/OrderInfo';
import UserAppeal from '@/pages/UserAppeal';

import AdminProducts from '@/pages/admin/AdminProducts';
import AdminCategory from '@/pages/admin/AdminCategory';

const Landing = lazy(() => import('@/pages/Landing'));
const RouteSheet = lazy(() => import('@/pages/Couriers/RouteSheet'));
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
const Warehouses = lazy(() => import('@/pages/Master/Warehouses'));
const WarehouseTable = lazy(() => import('@/pages/Master/WarehouseTable'));

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const UserPage = lazy(() => import('@/pages/User/UserPage'));
const MyFavorite = lazy(() => import('@/pages/catalog/MyFavorite'));

const CourierOrders = lazy(() => import('@/pages/Couriers/CourierOrders'));
const CourierPage = lazy(() => import('@/pages/Couriers/CourierPage'));
const MasterPage = lazy(() => import('@/pages/Master/MasterPage'));
const Employee = lazy(() => import('@/pages/Employee/Employee'));
const EmployeeUserPage = lazy(() => import('@/pages/Employee/EmployeeUserPage'));

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
            <Route
              path="/employee/user/:id"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_EMPLOYEE'} redirectPath="/catalog">
                  <EmployeeUserPage />
                </ProtectedRoute>
              }
            />
            {/* личная страница мастера */}
            <Route
              path="/master"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_MASTER'} redirectPath="/catalog">
                  <MasterPage />
                </ProtectedRoute>
              }
            />
            {/* личная страница курьера */}
            <Route
              path="/courier"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_COURIER'} redirectPath="/catalog">
                  <CourierPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myFavorite"
              element={
                <ProtectedRoute isAllowed={user?.phone ? true : false} redirectPath="/catalog">
                  <MyFavorite />
                </ProtectedRoute>
              }
            />
            <Route path="/courier/routeSheet" element={<RouteSheet />} />
            {/* Список складов */}
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/warehouse/:id" element={<WarehouseTable />} />

            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<BottlePage />} />
            <Route
              path="/myOrders"
              element={
                <ProtectedRoute
                  isAllowed={user?.role === 'ROLE_USER' || user?.role === 'ROLE_MASTER'}
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
                  <CourierOrders />
                </ProtectedRoute>
              }
            />

            {/**************************************************************************************** */}

            {/* страница регистрации по сгенерированным ссылкам */}
            <Route path="/register/employee/*" element={<RegisterLinkEmployee />} />
            {/*вход админ */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <NoPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/allUsers" element={<AdminAllUsers />} />
            <Route path="/admin/workers" element={<AdminWorkers />} />
            <Route path="/admin/couriers" element={<AdminCouriers />} />

            <Route path="/admin/warehouses" element={<AdminWarehouses />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/category" element={<AdminCategory />} />

            <Route path="/requestsUser" element={<RequestsUser />} />
            <Route path="/appeal" element={<UserAppeal />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
