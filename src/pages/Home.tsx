import { motion } from 'framer-motion';

import { Header } from '@/components/Header';
import { First } from '@/components/First';
import { Second } from '@/components/Second';

const Home = () => {
  return (
    <div className={`bg-light-blue h-screen relative`}>
      <Header />
      <First />
      {/* <Second /> */}
    </div>
  );
};

export default Home;
