import { useAppSelector } from '@/hooks/useAppSelector';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Checkbox from '../Checkbox';
import { Button } from '../Forms';

type Props = {
  pickup: boolean;
  setPickup: Function;
  delivery: boolean;
  setDelivery: Function;
  useBonus: boolean;
  setUseBonus: Function;
  isValid: boolean;

  initialTotal: number;
  buttonAction?: any;
  initial?: any;
};

// const handleTotal = useCallback(
//   (isDel: boolean = false) => {
//     if (isDel) setTotal(total + 300);
//     else setTotal(total);
//   },
//   [initialTotal]
// );
export const Total: FC<Props> = ({
  pickup,
  setPickup,
  delivery,
  setDelivery,
  useBonus,
  setUseBonus,
  isValid, 
  initialTotal,
  buttonAction,
  initial
}) => {
  const navigate = useNavigate();
  // const total = useAppSelector((state) => state.cart.total);

  return (
    <div className="lg:order-3 bg-white lg:h-56  rounded-xl p-2  ">
      <div className="flex w-full border-b-2 border-dashed border-gray-500 lg:border-gray-300">
        <h3 className="font-bold font-montserrat text-lg text-center text-dark-blue">
          Итого: {initialTotal} Т
        </h3>
      </div>
      <div className=" mx-auto flex flex-col gap-2">
        <div className="flex items-center w-full ">
          <Checkbox
            label="Использовать бонусы"
            className="w-3.5 h-3.5 cursor-pointer"
            checked={useBonus}
            id="delivery"
            name="delivery"
            // onChange={(e) => {
            //   handleTotal(e.target.checked);
            // }}
            onClick={() => {
              if (useBonus) {
                setPickup(false);
              }
              setUseBonus(!useBonus);
            }}
            labelClass="text-dark-blue"
          />
          {/* <span className="text-gray-600 font-semibold text-sm font-montserrat ml-2">+300 T</span> */}
        </div>
        <div className="flex items-center w-full">
          <Checkbox
            label="Самовывоз"
            className="w-3.5 h-3.5 cursor-pointer"
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
        <div className="flex items-center w-full ">
          <Checkbox
            label="Доставка до адреса"
            className="w-3.5 h-3.5 cursor-pointer"
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
      </div>
      <div className="lg:w-full lg:flex py-2 lg:justify-center hidden">
        <Button
          className="w-80 h-11 text-sm disabled:bg-opacity-70 lg:w-5/6"
          buttonColor="bg-dark-blue hover:bg-blue-900 font-montserrat"
          disabled={!isValid}
          onClick={() => {
            buttonAction(initial);
            // alert(JSON.stringify(address, null, 2));
            navigate('/myOrders'); // TODO: Когда будут данные с сервера то направить на order-id
          }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
