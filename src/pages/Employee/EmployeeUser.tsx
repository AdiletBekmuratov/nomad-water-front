import { Layout } from '@/components/Layout';
import { useGetUserIDQuery } from '@/redux/services/user.service';
import { useParams } from 'react-router-dom';

const EmployeeUser = () => {
  const { id: userId } = useParams();

  const {data:user } = useGetUserIDQuery(Number(userId!));
  const styleP = `text-sm md:text-base bg-white rounded-md px-3 grid grid-cols-2`;

  return (
    <Layout>
      <div
        className={`font-montserrat text-dark-blue grid grid-cols-1 lg:grid-cols-3 mt-2 gap-5 lg:gap-3`}>
        <div className="grid gap-2 ">
          <p className={`${styleP}`}>
            <strong>Фамилия: </strong> <span>{` ${user?.lastname} `}</span>
          </p>
          <p className={`${styleP}`}>
            <strong>Имя: </strong> {` ${user?.firstname} `}
          </p>
          <p className={`${styleP}`}>
            <strong>Отчество: </strong>{' '}
            {` ${user?.middleName ? user?.middleName : 'Не заполнено'} `}
          </p>
        </div>
        <div className="grid gap-2 ">
          <p className={`${styleP}`}>
            <strong>День рождения: </strong> {` ${user?.birthday ? user?.birthday : ''}`}
          </p>
          <p className={`${styleP}`}>
            <strong>Телефон: </strong> <span>{` ${user?.phone} `}</span>
          </p>
          <p className={`${styleP}`}>
            <strong>Telegram: </strong>{' '}
            {` ${user?.telegramAccount ? user?.telegramAccount : 'Не заполнено'} `}
          </p>
        </div>
        <div className="grid gap-2 ">
          <p className={`${styleP}`}>
            <strong>Микрорайон / Улица: </strong>{' '}
            <span>{` ${user?.street ? user?.street : 'Не заполнено'} `}</span>
          </p>
          <p className={`${styleP}`}>
            <strong>Дом: </strong> {` ${user?.houseNumber ? user?.houseNumber : 'Не заполнено'} `}
          </p>
          <p className={`${styleP}`}>
            <strong>Квартира: </strong> {` ${user?.flat ? user?.flat : 'Не заполнено'} `}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeUser;
