import { Header } from '@/components/Header';
import { First } from '@/components/First';
import { About } from './About';
import { Qushions } from './Qushions';
import { Footer } from './Footer';
const Home = () => {
  return (
    <div className={`bg-light-blue h-screen relative`}>
      <Header />
      <First />
      <About />
      <Qushions />
      <Footer />
    </div>
  );
};

export default Home;
