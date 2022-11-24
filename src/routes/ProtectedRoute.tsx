import { FC, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
