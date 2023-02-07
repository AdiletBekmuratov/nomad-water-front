import { useAppSelector } from '@/hooks/useAppSelector';
import { IUsersOrder } from '@/types';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Checkbox from '../Checkbox';
import { Button } from '../Forms';

type Props = {
  pickup: boolean;
  setPickup: React.Dispatch<React.SetStateAction<boolean>>;
  useBonus: boolean;
  setUseBonus: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  initialTotal: number;
  buttonAction: () => void;
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
  useBonus,
  setUseBonus,
  isValid,
  initialTotal,
  buttonAction
}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-white rounded-xl p-5  ">
      <div className=" mx-auto flex flex-col gap-2">
        {user
          ? user.role === 'ROLE_USER' && (
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
            )
          : null}
        <div className="flex items-center w-full">
          <Checkbox
            label="Самовывоз"
            className="w-3.5 h-3.5 cursor-pointer"
            checked={pickup}
            id="deliver"
            name="deliver"
            // onChange={() => handleTotal(false)}
            onClick={() => {
              setPickup(!pickup);
            }}
            labelClass="text-dark-blue"
          />
        </div>
        {/* <div className="flex items-center w-full ">
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
        </div> */}
        <div className="flex w-full border-t-2 border-dashed border-gray-500 lg:border-gray-300">
          <h3 className="font-bold font-montserrat text-lg text-center text-dark-blue">
            Итого: {initialTotal} Т
          </h3>
        </div>
      </div>
      <div className="flex py-2 justify-center">
        <Button
          className="text-sm disabled:bg-opacity-70"
          buttonColor="bg-dark-blue hover:bg-blue-900 font-montserrat"
          disabled={!isValid}
          onClick={() => {
            buttonAction();
            if (user) {
              user.role === 'ROLE_EMPLOYEE' ? navigate('/employee') : navigate('/myOrders') ;
            }
          }}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
