import { HeaderLend, First, About, Question, Second } from '@/components/Landing';

const Landing = () => {
  return (
    <div className={`bg-light-blue relative w-full scroll-smooth`}>
      <HeaderLend />
      <First />
      <Second />
      <About />
      <Question />
    </div>
  );
};

export default Landing;
