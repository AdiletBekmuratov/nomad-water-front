import { IRouteSheet } from '@/types/routeSheet.types';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  date: string;
  componentRef: any;
  routeSheet: IRouteSheet[];
};

const RouteSheetTable: FC<Props> = (props) => {
  console.log(props.routeSheet);

  return (
    <div>
      <div>
        <h1>Маршрутный лист</h1>
      </div>
      <div>
        <table>
          <tr>
            <th>id</th>
            <th>Адрес клиента</th>
            <th>Номер клиента</th>
          </tr>
          <tr>
            {props.routeSheet.map((route, idx) => (
              <tr key={idx}>
                <td>{route.id}</td>
                <td>{route.order.address}</td>
              </tr>
            ))}
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default RouteSheetTable;
