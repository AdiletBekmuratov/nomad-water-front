import { Header, First, About, Question, Second, Footer } from '@/components/Home';

const Home = () => {
  return (
    <div
      className={`bg-light-blue relative w-full scroll-smooth overflow-auto snap-y snap-mandatory h-screen`}>
      <Header />
      <First />
      <Second />
      <About />
      <Question />
      <Footer />
    </div>
  );
};

export default Home;
