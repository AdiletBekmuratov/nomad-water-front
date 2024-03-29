import { ICourierOrder } from '@/types/courier.types';
import { IRouteSheet } from '@/types/routeSheet.types';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  date?: string;
  componentRef: any;
  routeSheet: {
    id?: number;
    order: ICourierOrder;
  }[];
};

const RouteSheetTable: FC<Props> = ({ date, componentRef, routeSheet }) => {
  return (
    <div ref={componentRef}>
      {date && <h3 className="font-semibold text-center">{`Маршрутный лист за: ${date}`}</h3>}
      <table className="border-collapse w-full bg-white">
        <tr className="">
          <th className="border text-left p-2">Номер заказа</th>
          <th className="border text-left p-2">Имя клиента</th>
          <th className="border text-left p-2">Адрес клиента</th>
          <th className="border text-left p-2">Номер клиента</th>
          <th className="border text-left p-2">Комментарий</th>
          <th className="border text-left p-2">Товар</th>
          <th className="border text-left p-2">Способ оплаты</th>
          <th className="border text-left p-2">Первоначальная цена</th>
          <th className="border text-left p-2">Итоговая цена</th>
        </tr>

        {routeSheet.map((route, idx) => (
          <tr key={idx}>
            <td className="border text-left p-2">{route.order.id}</td>
            <td className="border text-left p-2">
              {`${route.order.user ? route.order.user.firstname : 'нет имени'} ${
                route.order.user ? route.order.user.lastname : 'нет фамилии'
              }`}
            </td>
            <td className="border text-left p-2">{route.order.address}</td>
            <td className="border text-left p-2">{route.order.phone}</td>
            <td className="border text-left p-2">
              {route.order.comment
                ? route.order.comment.length > 0
                  ? route.order.comment
                  : 'Нет комментариев'
                : 'Нет комментариев'}
            </td>
            <td className="border text-left p-2">
              {route.order.orderProducts.map((order, idx) => (
                <p
                  key={idx}
                  className="text-left p-2">{`${idx+1})`}{`${order.product.productName}, к. ${order.quantity}`}</p>
              ))}
            </td>
            <td className="border text-left p-2">{`${route.order.paymentMethod!.name}`}</td>
            <td className="border text-left p-2">{`${route.order.initialPrice} тг`}</td>
            <td className="border text-left p-2">{`${route.order.totalPrice} тг`}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RouteSheetTable;
