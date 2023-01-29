import React, { useState, useEffect, useRef } from 'react';

import { useLazyGetUserOrderQuery } from '@/redux/services/base.service';

import { Layout } from '@/components/Layout';
import { ActionButtons, Table } from '@/components/Table';
import { ColumnDef, Row } from '@tanstack/react-table';
import { IOrder } from '@/types';
import Loader from '@/components/Landing/Loader';
import OrderHistory from '../User/OrderHistory';
import { WS_URL } from '@/redux/http';
import { Modal } from '@/components/Layout/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Form, Formik } from 'formik';
import { Button, Input, TextArea } from '@/components/Forms';
import { toast } from 'react-hot-toast';
import RateOrder from './RateOrder';

const Orders = () => {
  const [fetchOrders] = useLazyGetUserOrderQuery();
  const [allOrders, setAllOrders] = useState<IOrder | []>([]);
  const [isRating, setIsRating] = useState(false);

  const clientRef = useRef<WebSocket | null>();
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState<IOrder>();

  const [isOpenModal, setIsOpenModal] = useState(false);

  // Но обновляется страница, отмена заказа работает
  const cancelOrder = async (id: number, cancelReason: string) => {
    // console.log(id, cancelReason);
    clientRef.current?.send(
      JSON.stringify({
        id,
        cancelReason
      })
    );
    //@ts-ignore

    toast.success('Успешно отменен заказ');
    setIsOpenModal(false);
  };

  const handleCancelOrder = (row: Row<IOrder>) => {
    setRowData(row.original);
    setIsOpenModal(true);
  };

  const handleRating = (row: Row<IOrder>) => {
    setRowData(row.original);
    setIsRating(true);
  };

  useEffect(() => {
    //@ts-ignore
    fetchOrders().then((res) => setAllOrders(res.data));

    if (waitingToReconnect) {
      return;
    }

    if (!clientRef.current) {
      const client = new WebSocket(WS_URL + '/order/cancel');
      clientRef.current = client;

      client.onerror = (e) => console.error(e);

      client.onopen = () => {
        setIsOpen(true);
        console.log('Подключен');
      };

      client.onclose = () => {
        if (clientRef.current) {
          console.log('Сокет отключен');
        } else {
          console.log('Отключен по причине unmount');
          return;
        }

        if (waitingToReconnect) {
          return;
        }
        setIsOpen(false);
        console.log('Сокет закрыт');
        setWaitingToReconnect(true);
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (message) => {
        let newData = JSON.parse(message.data);
        //@ts-ignore
        setAllOrders((prev) => {
          //@ts-ignore
          [...prev, newData];
        });
      };
    }
  }, [allOrders, waitingToReconnect]);

  const columnsUser = React.useMemo<ColumnDef<IOrder, any>[]>(
    () => [
      {
        header: 'id',
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
        header: 'Время заказа',
        accessorKey: 'orderDateTime'
      },
      {
        header: 'Метод оплаты',
        accessorKey: 'paymentMethod.name'
      },
      {
        header: 'Общая цена заказа',
        accessorKey: 'totalPrice'
      },
      {
        header: 'Адрес',
        accessorKey: 'address'
      },
      {
        header: 'Комментарий',
        accessorKey: 'comment'
      },
      {
        header: 'Оценить заказ',
        cell: ({ row }) => {
          if (row.original.rating) {
            return `Заказ оценен на ${row.original.rating} звезд(ы)`;
          } else if (row.original.statusId === 3) {
            return <ActionButtons handleRating={() => handleRating(row)} />;
          }

          // row.original.statusId === 3 ? (
          //   <ActionButtons handleRating={() => handleRating(row)} />
          // ) : (
          //   row.original.rating && <></>
          // );
        }
      },
      {
        header: 'Отменить заказ',
        cell: ({ row }) =>
          row.original.statusId === 0 && (
            <ActionButtons handleCancelOrder={() => handleCancelOrder(row)} />
          )
      }
    ],
    []
  );
  if (!allOrders) {
    return <Loader />;
  }

  return (
    <Layout className={``}>
      <Table id="ProductsTable" data={allOrders} columns={columnsUser} title="Текущие заказы" />
      <div className={`border-b-2 border-dotted border-gray-700 py-2 my-3 `}></div>
      <OrderHistory />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="flex items-center justify-between">
          <h2 className={`text-center`}>Отменить заказ</h2>
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}>
            <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
          </button>
        </div>
        <Formik
          initialValues={{ cancelReason: '' }}
          onSubmit={(values) => cancelOrder(Number(rowData?.id), values.cancelReason)}>
          <Form className="mt-2">
            <TextArea
              id="cancelReason"
              name={`cancelReason`}
              label="Причина отмены заказа"
              className="h-32 border"
            />
            <div className="w-2/3 mt-4 mx-auto">
              <Button type="submit">Отправить</Button>
            </div>
          </Form>
        </Formik>
      </Modal>
      <RateOrder data={rowData!} setIsOpenModal={setIsRating} isOpenModal={isRating} />
    </Layout>
  );
};
export default Orders;
