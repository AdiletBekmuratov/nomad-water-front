import { FC } from 'react';
import { Card } from '../components/Forms/index';
import Register from './Register';

const RegisterForm: FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <Register />
      </Card>
    </div>
  );
};

export default RegisterForm;
