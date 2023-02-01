import { ICourierOrder } from '@/types/courier.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActionButtons, Table } from '@/components/Table';
import {
  useConfirmOrdersMutation,
  useLazyGetPendingOrdersQuery
} from '@/redux/services/employee.service';
import Loader from '@/components/Landing/Loader';
import { toast } from 'react-hot-toast';
import { ColumnDef } from '@tanstack/react-table';
import { Modal } from '@/components/Layout/Modal';
import { Button } from '@/components/Forms';
import { WS_URL } from '@/redux/http';

const Pending = () => {
  const [fetchOrders, { isLoading }] = useLazyGetPendingOrdersQuery();
  const [data, setData] = useState();
  // const { data = [], isLoading, refetch } = useGetPendingOrdersQuery();
  const [accept] = useConfirmOrdersMutation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowData] = useState<ICourierOrder>();

  const clientRef = useRef<WebSocket | null>(null);
  const acceptRef = useRef<WebSocket | null>(null);
  const cancelRef = useRef<WebSocket | null>(null);

  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    //@ts-ignore
    fetchOrders().then((res) => setData(res.data));

    if (waitingToReconnect) {
      return;
    }

    if (!clientRef.current) {
      const client = new WebSocket(WS_URL + '/order/create');
      const employee = new WebSocket(WS_URL + '/order/confirm');
      const cancel = new WebSocket(WS_URL + '/order/cancel');

      clientRef.current = client;
      acceptRef.current = employee;
      cancelRef.current = cancel;

      client.onerror = (err) => {
        console.error(err);
      };

      employee.onerror = (err) => {
        console.error(err);
      };

      cancel.onerror = (err) => console.error(err);

      client.onopen = () => {
        setIsConnected(true);
        console.log('Диспетчер подключен');
      };

      cancel.onopen = () => {
        console.log('Отмена заказа');
      };

      employee.onopen = () => {
        console.log('Функции диспетчера подключены');
      };

      client.onclose = () => {
        if (clientRef.current) {
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

      employee.onclose = () => {
        if (acceptRef.current) {
          console.log('Функции диспетчера отключены');
        } else {
          console.log('Функции диспетчера отключены из-за бездействия');
        }
      };

      cancel.onclose = () => {
        if (cancelRef.current) {
          console.log('Отмена');
        } else {
          console.log('Отмена бездействия');
        }
      };

      client.onmessage = (message) => {
        const newData = JSON.parse(message.data);
        console.log(newData);
        //@ts-ignore
        setData((prevData) => [newData, ...prevData]);
      };

      employee.onmessage = (message) => {
        const newData = JSON.parse(message.data);
        console.log(newData);
      };

      cancel.onmessage = (message) => {
        const newData = JSON.parse(message.data);
      };
    }
  }, [waitingToReconnect]);

  const acceptOrder = async (id: number) => {
    console.log(id);
    acceptRef.current?.send(
      JSON.stringify({
        id
      })
    );
    //@ts-ignore
    const newData = data?.filter((item) => item.id !== id);
    setData(newData);
  };

  const columns = useMemo<ColumnDef<ICourierOrder, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Статус заказа',
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
        header: 'Адрес доставки',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий к заказу',
        accessorKey: 'comment'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Номер телефона получателя',
        accessorKey: 'phone'
      },
      {
        header: 'Полная цена с доставкой',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Действия',
        cell: ({ row }) => (
          <ActionButtons
            handleCompleteClick={() => {
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
  if (data?.length === 0) {
    return (
      <div>
        <h2 className={`text-lg font-bold text-center mb-4`}>Заказы:</h2>
        <p className={`text-base font-semibold text-center mb-4 text-red-600`}>Новых заказов нет</p>
      </div>
    );
  }

  return (
    <div className="py-3">
      <Table data={data!} columns={columns} id="ProductsTable"  />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите подтвердить данный заказ?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700"
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

export default Pending;
