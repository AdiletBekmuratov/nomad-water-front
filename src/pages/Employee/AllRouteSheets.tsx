import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';

import { useGetAllRouteSheetQuery } from '@/redux/services/courier.service';
import { IRouteSheet } from '@/types/routeSheet.types';

import { useRef, useState, useMemo, useEffect, Fragment } from 'react';

import { useReactToPrint } from 'react-to-print';
import RouteSheetTable from '../Couriers/RouteSheetTable';
import { AiOutlinePrinter } from 'react-icons/ai';
import { useGetUserROLEQuery } from '@/redux/services/user.service';

const AllRouteSheets = () => {
  const componentRef = useRef<any>();
  const [routeSheet, setRouteSheet] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const { data: couriers = [], isLoading: courierLoad } = useGetUserROLEQuery('ROLE_COURIER');
  const [courierId, setCourierId] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Маршрутный лист за${new Date()}`
  });

  const handleDate = (e: any) => {
    let year = e.target.value.substring(0, 4);
    let month = e.target.value.substring(5, 7);
    let day = e.target.value.substring(8, 10);
    setCurrentDate(`${day}-${month}-${year}`);
  };
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: Date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join('-');
  }

  const { data: routeData = [], isLoading } = useGetAllRouteSheetQuery();
  useEffect(() => {
    routeData?.map((route) => setRouteSheet(route.routeSheetOrders));
  }, [isLoading]);
  if (isLoading && courierLoad) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center font-montserrat">
        Выберите дату заказов
        <Input
          inputType="default"
          id="date"
          type="date"
          onChange={handleDate}
          // className={`max-w-md`}
        />
        Выберите курьера
        <select id="courier" onChange={(e) => setCourierId(e.target.value)}>
          {couriers.map((cour) => (
            <Fragment key={cour.id}>
              <option value="">Выберите курьера</option>
              <option value={cour.id}>{`${cour.firstname} ${cour.lastname}`}</option>
            </Fragment>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 mt-4">
        <Button onClick={handlePrint} className="font-montserrat">
          <AiOutlinePrinter className="mr-2" /> Печать
        </Button>
      </div>
      <div className="flex justify-center font-montserrat">
        {routeSheet.length === 0 ? (
          <>На сегодня нет маршрутных листов</>
        ) : currentDate.length === 0 ? (
          <RouteSheetTable
            componentRef={componentRef}
            date={formatDate(new Date())}
            routeSheet={routeSheet}
          />
        ) : (
          <>sdfsdf</>
        )}
      </div>
    </>
  );
};

export default AllRouteSheets;
