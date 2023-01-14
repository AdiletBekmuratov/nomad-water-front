import { VariantStatus } from '@/assets/types/types';
import { FC, ReactNode } from 'react';

interface IOrderStatus {
  variants?: VariantStatus;
}
export const OrderStatus: FC<IOrderStatus> = ({ variants }) => {
  return (
    <>
      {(() => {
        switch (variants) {
          case 'complete':
            return <span className="text-green-color text-xs md:text-sm">Завершен</span>;
          case 'cancel':
            return (
              <span className="text-gray-500 text-xs md:text-sm">
                Отменен по причине технических проблем
              </span>
            );
          default:
            return (
              <span className="text-blue-order-status text-xs md:text-sm">
                Ожидайте доставку сегодня
              </span>
            );
        }
      })()}
    </>
  );
};
