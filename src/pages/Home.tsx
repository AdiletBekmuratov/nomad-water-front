import { Header } from '@/components/Header';
import { First } from '@/components/First';
import { About } from './About';
import { Question } from './Question';
import { Footer } from './Footer';
const Home = () => {
  return (
    <div className={`bg-light-blue h-screen relative`}>
      <Header />
      <First />
      <About />
      <Question />
      <Footer />
    </div>
  );
};

export default Home;
