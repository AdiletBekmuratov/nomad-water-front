import { HeaderLend, First, About, Question, Second } from '@/components/Landing';

const Landing = () => {
  return (
    <div className={`bg-light-blue w-full relative scroll-smooth`}>
      <HeaderLend />
      <First />
      <Second />
      <About />
      <Question />
    </div>
  );
};

export default Landing;
