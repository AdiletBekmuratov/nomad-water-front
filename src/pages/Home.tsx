import { First } from '@/components/First';
import { Header } from '@/components/Header';
// import { Second } from '@/components/Second';

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
