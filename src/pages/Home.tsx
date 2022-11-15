import { Header } from '@/components/Header';
import { First } from '@/components/First';

const Home = () => {
  return (
    <div className={`bg-light-blue h-screen relative`}>
      <Header />
      <First />
    </div>
  );
};

export default Home;
