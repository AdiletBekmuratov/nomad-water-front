import { Modal } from '@/components/modal';
import { FC } from 'react';
import { Card } from '../components/Forms/index';
import Register from './Register';

const RegisterForm: FC = () => {
  return (
    <>
      <Modal title="Test title" buttonOpenText="Open" buttonCloseTest="Close">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores eligendi eos nihil
          voluptatum cupiditate iusto mollitia, optio fugiat, voluptatem illum consectetur! Non,
          expedita ipsam harum rem est odio veritatis ratione?
        </p>
      </Modal>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <Register />
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;
