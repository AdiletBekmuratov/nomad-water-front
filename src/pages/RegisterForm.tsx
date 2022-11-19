import { Modal } from '@/components/UI';
import { FC } from 'react';
import { Card } from '../components/Forms/index';
import Register from './Register';

const RegisterForm: FC = () => {
  return (
    <>
      <Modal title="Test title" buttonOpenText="Open" buttonCloseTest="Close">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum adipisci rem quaerat
          recusandae impedit, veritatis fugit numquam necessitatibus atque sed. Voluptas sunt
          recusandae veniam animi molestias perspiciatis obcaecati alias. Aspernatur!
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
