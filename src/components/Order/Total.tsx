import { FC } from 'react';
import Checkbox from '../Checkbox';
import { Button } from '../Forms';

type Props = {
  pickup: boolean;
  delivery: boolean;
  setPickup: Function;
  setDelivery: Function;
  setTotal: Function;
  total: number;
  isValid: boolean;
  address: Object;
};

export const Total: FC<Props> = ({
  pickup,
  delivery,
  setPickup,
  setDelivery,
  setTotal,
  total,
  isValid,
  address
}) => {
  return (
    <div className="lg:order-2 lg:bg-white lg:h-48 lg:mt-6 lg:rounded-2xl lg:row-start-1">
      <div className="h-6 w-3/4 mt-5 mx-auto gap-2.5 md:w-5/6">
        <div className="flex items-center w-full">
          <Checkbox
            label="Самовывоз"
            className="w-3.5 h-3.5"
            checked={pickup}
            id="deliver"
            name="deliver"
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
            onChange={(e) => {
              e.target.checked ? setTotal(total + 300) : setTotal(total - 300);
            }}
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
      <div className="lg:w-full lg:flex lg:justify-center lg:h-2/3 lg:items-end">
        <Button
          className="w-80 h-11 text-sm disabled:bg-opacity-70 lg:w-5/6"
          buttonColor="bg-dark-blue font-montserrat"
          disabled={!isValid}
          onClick={() => alert(JSON.stringify(address, null, 2))}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
