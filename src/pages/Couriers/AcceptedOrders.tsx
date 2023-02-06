import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState, useRef, useEffect } from 'react';
import { ActionButtons, Table } from '../../components/Table';
import { useLazyGetCourierOrderQuery } from '@/redux/services/courier.service';
import Loader from '../../components/Landing/Loader';
import { toast } from 'react-hot-toast';
import { Modal } from '../../components/Layout/Modal';
import { Button } from '../../components/Forms';
import { WS_URL } from '@/redux/http';

export const AcceptedOrders = () => {
  const [courierOrders] = useLazyGetCourierOrderQuery();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowData] = useState<ICourierOrder[] | undefined>();

  const [data, setData] = useState<ICourierOrder>();

  const courierRef = useRef<WebSocket | null>(null);
  const completeRef = useRef<WebSocket | null>(null);

  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const acceptOrder = async (id: number) => {
    completeRef.current?.send(
      JSON.stringify({
        id
      })
    );
    //@ts-ignore
    const newData = data?.filter((item) => item.id !== id);
    setData(newData);
    toast.success('Заказ доставлен');
  };

  useEffect(() => {
    //@ts-ignore
    courierOrders().then((res) => setData(res.data.filter((order) => order.statusId === 2)));

    if (waitingToReconnect) {
      return;
    }

    if (!courierRef.current) {
      const courier = new WebSocket(WS_URL + '/order/accept');
      const complete = new WebSocket(WS_URL + '/order/complete');

      completeRef.current = complete;
      courierRef.current = courier;

      complete.onopen = () => {
        setIsConnected(true);
        console.log('Функции курьера подключены');
      };

      courier.onerror = (err) => {
        console.error(err);
      };

      courier.onopen = () => {
        console.log('Связь между диспетчером подключена');
      };

      complete.onerror = (err) => {
        console.error(err);
      };

      complete.onclose = () => {
        if (completeRef.current) {
          console.log('Функции курьера отключены');
        } else {
          console.log('Функции курьера отключены по причине бездействия');
        }
      };

      courier.onclose = () => {
        if (courierRef.current) {
          console.log('Функции курьера отключены');
        } else {
          console.log('Функции курьера отключены по причине бездействия');
        }
      };

      courier.onmessage = (message) => {
        const newData = JSON.parse(message.data);
        //@ts-ignore
        setData((prevData) => [newData, ...prevData]);
      };

      complete.onmessage = (message) => {
        const newData = JSON.parse(message.data);
        console.log(newData);
      };

      complete.onclose = () => {
        if (courierRef.current) {
          console.log('connection was closed');
        } else {
          console.log('connection closed by app component unmount');
        }
        if (waitingToReconnect) {
          return;
        }
        setIsConnected(false);
        console.log('connection closed');
        setWaitingToReconnect(true);

        setTimeout(() => setWaitingToReconnect(null), 5000);
      };
    }
  }, [waitingToReconnect]);

  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Адрес доставки',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий',
        accessorKey: 'comment'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Полная цена с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Статус заказа',
        //accessorKey: 'statusId'
        cell: ({ row }) =>
          row.original.statusId === 2 ? (
            <span className="text-blue-400 uppercase">{'в пути'}</span>
          ) : row.original.statusId === 0 ? (
            <span className="text-yellow-400 uppercase">{'В ожидании'}</span>
          ) : row.original.statusId === 1 ? (
            <span className="text-fuchsia-400 uppercase">{'подтвержден'}</span>
          ) : row.original.statusId === 3 ? (
            <span className="text-green-500 uppercase">{'доставлен'}</span>
          ) : (
            <span className="text-red-500 uppercase">{'отменен'}</span>
          )
      },
      {
        header: 'Действия',
        cell: ({ row }) => (
          <ActionButtons
            handleCompleteClick={() => {
              //@ts-ignore
              setRowData(row.original);
              setIsOpenModal(true);
            }}
          />
        )
      }
    ],
    []
  );
  if (!data) {
    return <Loader />;
  }
  //@ts-ignore
  if (data.length === 0) {
    return (
      <div>
        <h2 className={`text-lg font-bold text-center mb-4`}>Доступные заказы:</h2>
        <p className={`text-base font-semibold text-center mb-4 text-red-600`}>
          Нет доступных к доставке заказов!
        </p>
      </div>
    );
  }

  return (
    <div>
      <Table id="ProductsTable" columns={columns} data={data!} title="Принятые заказы" />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите взять данный заказ?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700 "
            onClick={() => {
              //@ts-ignore
              acceptOrder(rowData?.id);
              setIsOpenModal(false);
            }}>
            Да
          </Button>
          <Button buttonColor="bg-gray-500" onClick={() => setIsOpenModal(false)}>
            Нет
          </Button>
        </div>
      </Modal>
    </div>
  );
};
