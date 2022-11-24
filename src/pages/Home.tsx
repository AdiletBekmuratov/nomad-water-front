import { Header, First, About, Question, Second } from '@/components/Home';

const Home = () => {
  return (
    <div
      className={`bg-light-blue relative w-full scroll-smooth overflow-auto snap-y snap-mandatory h-screen overflow-x-hidden`}>
      <Header />
      <First />
      <Second />
      <About />

      <Question />
    </div>
  );
};

export default Home;
