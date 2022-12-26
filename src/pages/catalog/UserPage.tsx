import { Layout } from '@/components/Layout';

import { Button, Input } from '@/components/Forms';

import { Link } from 'react-router-dom';

import userPhoto from '@/assets/crm/userPhoto.jpg';
import { NoAuthCatalog } from './NoAuthCatalog';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loader from '@/components/Loader';

const UserPage = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout>
      {!user ? (
        <NoAuthCatalog />
      ) : (
        <div className={`flex flex-col items-center justify-center`}>
          <h2>Пользователь № {user.id}</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-7 py-5`}>
            <img src={userPhoto} className={`md:order-2`} alt="user" width={200} />

            <div className={`grid grid-cols-1 gap-5 text-sm`}>
              <h2 className={`text-base font-semibold`}>{user?.role}</h2>
              <span>Адрес: Мангилик Ел С 4.6, блок А</span>
              <span>Номер телефона: +7 777 707 7070</span>
              <span>
                Предпочитаемое время доставки:{' '}
                <span className={`border-b-2 border-dotted border-black`}>после 20:00</span>
              </span>
              <Button>Изменить данные</Button>
            </div>
          </div>
          <div className={`flex flex-col gap-3 my-10`}>
            <span className={`text-base font-bold `}>
              Оставьте номер и мы Вам обязательно перезвоним!
            </span>
            <Input
              inputType="default"
              id="phone"
              name="phone"
              label="Номер телефона"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (999) 999-99-99"
            />
            <Button>Перезвоните мне</Button>
          </div>
          <div className={`grid grid-cols-2 gap-x-10 sm:hidden`}>
            <Link to="/catalog">К каталогу</Link>
            <Link to="/catalog">К акциям</Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
