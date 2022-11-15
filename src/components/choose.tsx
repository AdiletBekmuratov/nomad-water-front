import RegByEmail from './regByEmail';
import { RegByPhone } from './regByPhone';

type Props = {
  isPhone: string;
};

const Choose = (props: Props) => {
  return <div>{props.isPhone === 'phone' ? <RegByPhone /> : <RegByEmail />}</div>;
};

export default Choose;
