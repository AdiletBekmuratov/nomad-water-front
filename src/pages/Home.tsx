import { Header } from '@/components/Header';
import { First } from '@/components/First';
import { About } from './About';
const Home = () => {
  return (
    <div className={`bg-light-blue h-screen relative`}>
      <Header />
      <First />
      <About />
    </div>
  );
};

export default Home;
