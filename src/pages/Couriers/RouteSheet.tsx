import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';
import { Table } from '@/components/Table';
import { useGetCurrentCourierRouteSheetQuery } from '@/redux/services/courier.service';
import { IRouteSheet } from '@/types/routeSheet.types';
import { ColumnDef } from '@tanstack/react-table';
import { useRef, useState, useMemo, useEffect } from 'react';
import { FaRoute } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import RouteSheetTable from './RouteSheetTable';

const RouteSheet = () => {
  const componentRef = useRef<any>();
  const [date, setDate] = useState('');
  const [routeSheet, setRouteSheet] = useState<IRouteSheet[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `RouteSheet${new Date()}`,
    onAfterPrint: () => alert('Printed successfully')
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

  const { isLoading, refetch } = useGetCurrentCourierRouteSheetQuery(currentDate);

  useEffect(() => {
    refetch().then((res) => setRouteSheet(res.data.routeSheetOrders));
  }, [currentDate]);

  const columns = useMemo<ColumnDef<IRouteSheet, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'order.id'
      },
      {
        header: 'Имя курьера',
        accessorKey: 'order.courier.user.firstname'
      },
      {
        header: 'Машина курьера',
        accessorKey: 'order.courier.car'
      },
      {
        header: 'Адрес доставки',
        accessorKey: 'order.address'
      },
      {
        header: 'Первоначальная цена',
        accessorKey: 'order.initialPrice'
      },
      {
        header: 'Финальная цена',
        accessorKey: 'order.totalPrice'
      },
      {
        header: 'Рейтинг',
        accessorKey: 'order.rating'
      },
      {
        header: 'Номер телефон клиента',
        accessorKey: 'order.user.phone'
      }
    ],
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div ref={componentRef}>
        <Layout>
          <div className="flex justify-center font-montserrat">Маршрутный лист за:</div>
          <Input inputType="default" id="date" type="date" onChange={handleDate} />
          {routeSheet.length > 0 ? (
            <Table data={routeSheet!} id="RouteSheet" columns={columns} />
          ) : (
            <div className="flex justify-center font-montserrat">
              <p className="text-red-500">
                На данный промежуток времени у вас нет маршрутного листа
              </p>
            </div>
          )}
          <Button onClick={handlePrint}>
            <FaRoute className="mr-2" />
            Скачать маршрутный лист
          </Button>
        </Layout>
        {/* <RouteSheetTable componentRef={componentRef} date={currentDate} routeSheet={routeSheet} /> */}
      </div>
    </>
  );
};

export default RouteSheet;
