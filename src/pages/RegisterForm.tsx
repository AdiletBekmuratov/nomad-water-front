import { Sheet } from '@/components/Layout/Sheet';
import { FC, useState } from 'react';
import { Button, Card } from '../components/Forms/index';

const RegisterForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <Button onClick={() => setIsOpen((prev) => !prev)}>Drawer</Button>
        </Card>
      </div>
    </Sheet>
  );
};

export default RegisterForm;
