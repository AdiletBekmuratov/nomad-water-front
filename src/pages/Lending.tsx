import { HeaderLend, First, About, Question, Second } from '@/components/Lending';

const Lending = () => {
  return (
    <div
      className={`bg-light-blue relative w-full scroll-smooth overflow-auto snap-y snap-mandatory h-screen overflow-x-hidden`}>
      <HeaderLend />
      <First />
      <Second />
      <About />

      <Question />
    </div>
  );
};

export default Lending;
