import { Layout } from '@/components/Layout';

import { Button, Input } from '@/components/Forms';

import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetUserIDQuery } from '@/redux/services/base.service';
import Loader from '@/components/Loader';
import { Edit } from '@/components/User/Edit';

const UserPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserIDQuery(user?.id!);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  if (isLoading) {
    return <Loader />;
  }
  console.log(data);
  return (
    <Layout>
      <div>
        <h1 className="text-center font-montserrat text-xl font-medium text-dark-blue">Профиль</h1>
        <div className="font-montserrat text-dark-blue grid grid-cols-2 mt-2 gap-2">
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>ФИО:</strong>
              {` ${data?.firstname} ${data?.lastname} ${data?.middleName.substring(0, 1)}.`}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>Улица: </strong>
              {`${data?.street} ${data?.houseNumber} квартира:  ${data?.flat}`}
            </p>
          </div>
          <div className="col-span-2 mx-auto">
            <p className="text-sm md:text-base">
              <strong>Номер телефона: </strong>
              {`${data?.phone}`}
            </p>
          </div>
        </div>
        <div className="mt-4 md:w-1/3 mx-auto">
          <Button onClick={() => setIsOpenEdit(true)}>Изменить данные</Button>
          <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={data!} />
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
