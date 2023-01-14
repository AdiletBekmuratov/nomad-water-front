import LayoutAdmin from '@/components/Admin/LayoutAdmin';

const NoPage = () => {
  return (
    <LayoutAdmin>
      <div className={`flex flex-col layout gap-3 py-5 items-center justify-center`}>
        <h1 className={`font-semibold text-lg lg:text-2xl text-center`}>
          Нет такой страницы <br /> Обратитесь к администратору.
        </h1>
      </div>
    </LayoutAdmin>
  );
};
export default NoPage;
