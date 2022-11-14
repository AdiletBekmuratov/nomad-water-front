import { FC, ReactElement, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IScrollToTopProps {
  children: ReactElement;
}

const ScrollToTop: FC<IScrollToTopProps> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default ScrollToTop;
