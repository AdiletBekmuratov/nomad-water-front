import FaqComp from '@/components/FaqComp';
import FormComponent from '@/components/FormComponent';
import { FC } from 'react';

const FAQForm: FC = () => {
  return (
    <FormComponent>
      <FaqComp header="Появился вопрос? Мы всегда готовы вам помочь!" />
    </FormComponent>
  );
};

export default FAQForm;
