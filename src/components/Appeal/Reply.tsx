import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Formik, Form } from 'formik';
import { Button, TextArea } from '../Forms';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type textArea = {
  reply: string;
};

export const Reply: FC<Props> = (props) => {
  const initialValue: textArea = { reply: '' };

  return (
    <div className={`bg-white ${props.className} mt-4 rounded-xl`}>
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
        {({ isValid }) => (
          <Form>
            <div className="mx-7 py-4">
              <h2 className="font-montserrat text-dark-blue font-semibold text-sm">Ответ</h2>
              <TextArea
                name="reply"
                placeholder="Напишите ответ на обращение и отправьте его"
                className="border rounded-lg placeholder:font-montserrat placeholder:text-dark-blue placeholder:text-xs border-gray-300 mt-4"
              />
            </div>
            <div className="w-full flex justify-center pb-5">
              <Button
                buttonColor="font-montserrat bg-dark-blue"
                className="w-64 h-10 flex items-center justify-center">
                Отправить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
