import { useAppSelector } from '@/hooks/useAppSelector';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Checkbox from '../Checkbox';
import { Button } from '../Forms';

type Props = {
  pickup: boolean;
  delivery: boolean;
  setPickup: Function;
  setDelivery: Function;

  isValid: boolean;
  address: Object;
  initialTotal: number;
  buttonAction?: any;
  initial?: any;
};

// const handleTotal = useCallback(
//   (isDel: boolean = false) => {
//     if (isDel) setTotal(total + 300);
//     else setTotal(total);
//   },
//   [cartItems]
// );
export const Total: FC<Props> = ({
  pickup,
  delivery,
  setPickup,
  setDelivery,

  isValid,
  address,

  buttonAction,
  initial
}) => {
  const navigate = useNavigate();
  const total = useAppSelector((state) => state.cart.total);
  return (
    <div className="lg:order-2 lg:bg-white lg:h-48  lg:rounded-2xl lg:row-start-1">
      <div className="h-6 w-3/4 mt-5 mx-auto gap-2.5 md:w-5/6">
        <div className="flex items-center w-full">
          <Checkbox
            label="Самовывоз"
            className="w-3.5 h-3.5"
            checked={pickup}
            id="deliver"
            name="deliver"
            // onChange={() => handleTotal(false)}
            onClick={() => {
              if (delivery) {
                setDelivery(false);
              }
              setPickup(!pickup);
            }}
            labelClass="text-dark-blue"
          />
        </div>
        <div className="flex items-center w-full lg:mt-1.5">
          <Checkbox
            label="Доставка до адреса"
            className="w-3.5 h-3.5"
            checked={delivery}
            id="delivery"
            name="delivery"
            // onChange={(e) => {
            //   handleTotal(e.target.checked);
            // }}
            onClick={() => {
              if (pickup) {
                setPickup(false);
              }
              setDelivery(!delivery);
            }}
            labelClass="text-dark-blue"
          />
          <span className="text-gray-600 font-semibold text-sm font-montserrat ml-2">+300 T</span>
        </div>
        <div className="flex w-full border-t-2 border-dashed border-gray-500 lg:border-gray-300 mt-2">
          <h3 className="font-bold mt-4 font-montserrat text-lg text-dark-blue">
            Итого: {total} Т
          </h3>
        </div>
      </div>
      <div className="lg:w-full lg:flex lg:justify-center lg:h-2/3 lg:items-end hidden">
        <Button
          className="w-80 h-11 text-sm disabled:bg-opacity-70 lg:w-5/6"
          buttonColor="bg-dark-blue font-montserrat"
          disabled={!isValid}
          onClick={() => {
            buttonAction(initial);
            // alert(JSON.stringify(address, null, 2));
            navigate('/userPage'); // TODO: Когда будут данные с сервера то направить на order-id
          }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
