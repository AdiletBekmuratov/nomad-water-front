import ScrollToTop from '@/components/ScrollToTop';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import OrderInfo from '@/pages/OrderPages/OrderInfo';
import OrderCreate from '@/pages/OrderPages/OrderCreate';
import UserAppeal from '@/pages/UserAppeal';
import WarehouseAppeal from '@/pages/WarehouseAppeal';
import Warehouses from '@/pages/Warehouses';
import { getMe } from '@/redux/slices/auth';
import ProtectedRoute from './ProtectedRoute';
import Loader from '@/components/Landing/Loader';

import AdminProducts from '@/pages/admin/AdminProducts';
import AdminCategory from '@/pages/admin/AdminCategory';
import LoginPage from '@/pages/LoginPage';
import Courier from '@/pages/Couriers/Courier';

// import AdminEmployee from '@/pages/admin/AdminEmployee';

const Landing = lazy(() => import('@/pages/Landing'));
const NoPage = lazy(() => import('@/pages/admin/NoPage'));

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const RegisterLinkEmployee = lazy(() => import('@/pages/RegisterLinkEmployee'));

const AdminAllUsers = lazy(() => import('@/pages/admin/AdminAllUsers'));
// const AdminCouriers = lazy(() => import('@/pages/admin/AdminCouriers'));
const AdminWarehouses = lazy(() => import('@/pages/admin/AdminWarehouses'));
const AdminUserME = lazy(() => import('@/pages/admin/AdminUserME'));

const Catalog = lazy(() => import('@/pages/catalog/Catalog'));
const Orders = lazy(() => import('@/pages/OrderPages/Orders'));
const Employee = lazy(() => import('@/pages/Employee/Employee'));

const BottlePage = lazy(() => import('@/pages/catalog/BottlePage'));
const RequestsUser = lazy(() => import('@/pages/catalog/RequestsUser'));
//const Users = lazy(() => import('@/pages/catalog/Users'));
const UserPage = lazy(() => import('@/pages/User/UserPage'));
const MyFavourite = lazy(() => import('@/pages/catalog/MyFavourite'));

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
            {/*вход админ */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* страница регистрации по сгенерированным ссылкам */}
            <Route path="/register/employee/*" element={<RegisterLinkEmployee />} />
            {/* личная страница пользователей админки  */}
            <Route path="/admin/AdminUserME" element={<AdminUserME />} />
            {/* личная страница юзера */}
            <Route path="/userPage" element={<UserPage />} />
            {/* личная страница курьера */}
            <Route
              path="/courier"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_COURIER'} redirectPath="/catalog">
                  <Courier />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/allUsers"
              element={
                <ProtectedRoute isAllowed={user?.role === 'ROLE_ADMIN'} redirectPath="/admin/login">
                  <AdminAllUsers />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/admin/couriers" element={<AdminCouriers />} /> */}

            <Route
              path="/employee"
              element={
                <ProtectedRoute
                  isAllowed={user?.role === 'ROLE_EMPLOYEE'}
                  redirectPath="/login/user">
                  <Employee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/warehouses"
              element={
                <ProtectedRoute isAllowed={user?.role !== ''} redirectPath="/admin/login">
                  <AdminWarehouses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAllowed={user?.role !== ''} redirectPath="/admin/login">
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/category"
              element={
                <ProtectedRoute isAllowed={user?.role !== ''} redirectPath="/admin/login">
                  <AdminCategory />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/admin/employee" element={<AdminEmployee />} /> */}

            <Route path="/admin/*" element={<NoPage />} />

            <Route path="/myFavourite" element={<MyFavourite />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<BottlePage />} />

            <Route path="/order" element={<OrderCreate />} />
            <Route path="/myOrders" element={<Orders />} />
            <Route path="/orderinfo" element={<OrderInfo />} />

            {/* <Route path="/users" element={<Users />} /> */}

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
