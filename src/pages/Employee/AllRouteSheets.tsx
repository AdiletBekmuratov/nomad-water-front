import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';

import {
  useGetAllRouteSheetQuery,
  useGetCourierRouteSheetOrdersQuery,
  useLazyGetCourierRouteSheetOrdersQuery
} from '@/redux/services/courier.service';
import { IRouteSheet } from '@/types/routeSheet.types';

import { useRef, useState, useEffect, Fragment } from 'react';

import { useReactToPrint } from 'react-to-print';
import RouteSheetTable from '../Couriers/RouteSheetTable';
import { AiOutlinePrinter } from 'react-icons/ai';

const AllRouteSheets = () => {
  const componentRef = useRef<any>();
  const [routeSheet, setRouteSheet] = useState<IRouteSheet | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Маршрутный лист за${new Date()}`
  });

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
    routeData?.map((route) => setRouteSheet(route));
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-3 mt-4">
        <Button onClick={handlePrint} className="font-montserrat">
          <AiOutlinePrinter className="mr-2" /> Печать
        </Button>
      </div>
      <div className="flex justify-center font-montserrat">
        {!routeSheet ? (
          <>На данный момент нет маршрутных листов</>
        ) : (
          <RouteSheetTable componentRef={componentRef} routeSheet={routeSheet?.routeSheetOrders} />
        )}
      </div>
    </>
  );
};

export default AllRouteSheets;
