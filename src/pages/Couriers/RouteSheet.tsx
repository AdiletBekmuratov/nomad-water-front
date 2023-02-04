import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';

import { useGetCurrentCourierRouteSheetQuery } from '@/redux/services/courier.service';
import { IRouteSheet } from '@/types/routeSheet.types';

import { useRef, useState, useMemo, useEffect } from 'react';

import { useReactToPrint } from 'react-to-print';
import RouteSheetTable from './RouteSheetTable';
import { AiOutlinePrinter } from 'react-icons/ai';

const RouteSheet = () => {
  const componentRef = useRef<any>();
  const [routeSheet, setRouteSheet] = useState<IRouteSheet | null>(null);
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

  const { isLoading, refetch } = useGetCurrentCourierRouteSheetQuery(formatDate(new Date()));

  useEffect(() => {
    refetch().then((res) => {
      setRouteSheet(res.data ? res.data : null);
    });
  }, [currentDate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="flex justify-center font-montserrat">Выберите дату заказов</div>
      <Input inputType="default" id="date" type="date" onChange={handleDate} />
      <div className="grid grid-cols-3 mt-4">
        <Button onClick={handlePrint} className="font-montserrat">
          <AiOutlinePrinter className="mr-2" /> Печать
        </Button>
      </div>
      {routeSheet?.routeSheetOrders ? (
        routeSheet?.routeSheetOrders.length > 0 ? (
          <RouteSheetTable componentRef={componentRef} date={currentDate} routeSheet={routeSheet?.routeSheetOrders} />
        ) : (
          <div className="flex justify-center font-montserrat">
            <p className="text-red-500">На данный промежуток времени у вас нет маршрутного листа</p>
          </div>
        )
      ) : null}
    </Layout>
  );
};

export default RouteSheet;
