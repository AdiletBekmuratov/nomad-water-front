import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ScrollToTop from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));

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
            <Route path="/" element={<Home />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
