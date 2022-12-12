import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import { Button, Input } from '@/components/Forms';

const NoAuthAdmin = () => {
  return (
    <LayoutAdmin>
      <div className={`flex flex-col layout gap-3 py-5 items-center justify-center`}>
        <h1 className={`font-semibold text-lg lg:text-2xl text-center`}>
          Нет доступа! <br /> Авторизуйтесь, либо обратитесь к администратору.
        </h1>
        <div className={`grid gap-5`}>
          <Input inputType="default" id="login" name="login" label="Логин" placeholder="Шпион" />
          <Input
            inputType="default"
            id="password"
            name="password"
            type={'password'}
            label="Пароль"
            placeholder="Секрет"
          />
          <Button>Войти</Button>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default NoAuthAdmin;
