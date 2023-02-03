import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';

import { useGetAllRouteSheetQuery } from '@/redux/services/courier.service';
import { IRouteSheet } from '@/types/routeSheet.types';

import { useRef, useState, useMemo, useEffect } from 'react';

import { useReactToPrint } from 'react-to-print';

const AllRouteSheets = () => {
  const componentRef = useRef<any>();
  const [routeSheet, setRouteSheet] = useState<IRouteSheet[]>([]);
  const [currentDate, setCurrentDate] = useState('');

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

  useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  const { data: routeData = [], isLoading, refetch } = useGetAllRouteSheetQuery(currentDate);

  useEffect(() => {
    refetch().then((res) => setRouteSheet(res.data.routeSheetOrders));
  }, [currentDate]);

  if (isLoading) {
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
      </div>
      {routeData.length > 0 ? (
        // <RouteSheetTable componentRef={componentRef} date={currentDate} routeSheet={routeSheet} />
        <div className={`flex flex-col`}>
          <div className={`flex items-center justify-between`}>
            {/* {routeData.map(route=>route)} */}

          </div>
        </div>
      ) : (
        <div className="flex justify-center font-montserrat">
          {currentDate.length === 0 ? (
            <>На сегодня нет маршрутных листов</>
          ) : (
            <p className="text-red-500">На эту дату нет маршрутных листов</p>
          )}
        </div>
      )}
      {/* <div className="grid grid-cols-3 mt-4">
        <Button onClick={handlePrint} className="font-montserrat">
          <AiOutlinePrinter className="mr-2" /> Печать
        </Button>
      </div> */}
    </>
  );
};

export default AllRouteSheets;
