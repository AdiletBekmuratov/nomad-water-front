import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';

import { WS_URL } from '@/redux/http';
import { useGetUserOrderQuery } from '@/redux/services/base.service';
import { useAppSelector } from '@/hooks';

import { Button, TextArea } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';
import { ActionButtons, Table } from '@/components/Table';
import { OrderHistory } from '../User';

import RateOrder from './RateOrder';
import DelayOrders from './DelayOrders';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { ICourierOrder } from '@/types/courier.types';

const Orders = () => {
  const { data: allOrders = [], isLoading, refetch } = useGetUserOrderQuery();
  const orders = allOrders.filter((order) => order.statusId !== 3 && order.statusId !== 4);

  const clientRef = useRef<WebSocket | null>();
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState<ICourierOrder>();


  const [isOpenModal, setIsOpenModal] = useState(false);
  const { products = [] } = useAppSelector((state) => state.cart);
  const { products: delayOrderProduct = [] } = useAppSelector((state) => state.delayOrder);
  // Но обновляется страница, отмена заказа работает
  const cancelOrder = async (id: number, cancelReason: string) => {
    // console.log(id, cancelReason);
    clientRef.current?.send(
      JSON.stringify({
        id,
        cancelReason
      })
    );

    toast.success('Успешно отменен заказ');
    setIsOpenModal(false);
  };

  const handleCancelOrder = (row: Row<ICourierOrder>) => {
    setRowData(row.original);
    setIsOpenModal(true);
  };



  useEffect(() => {
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
        refetch();
      };
    }
  }, [allOrders, waitingToReconnect]);

  const columnsUser = useMemo<ColumnDef<ICourierOrder, any>[]>(
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
        header: 'Отменить заказ',
        cell: ({ row }) =>
          row.original.statusId === 0 && (
            <ActionButtons handleCancelOrder={() => handleCancelOrder(row)} />
          )
      }
    ],
    []
  );
  if (!orders) {
    return <Loader />;
  }

  return (
    <Layout className={``}>
      {orders.length === 0 ? (
        <div className="flex items-center flex-col gap-3">
          <h2 className={`text-xl font-semibold `}>Мои заказы</h2>
          <h2 className={`text-lg font-semibold text-red-600`}>Текущих заказов нет</h2>
          <span> Перейдите в каталог и оформите хотя бы один заказ:</span>
          <Link to="/catalog">
            <Button className={`w-32 hover:bg-blue-900`}>В каталог</Button>
          </Link>
          {products.length > 0 && (
            <>
              <span>Либо продолжите офромление в корзине:</span>
              <Link to="/order">
                <BsFillCartFill className="h-10 w-10 cursor-pointer" />
              </Link>
            </>
          )}
        </div>
      ) : (
        <Table id="ProductsTable" data={orders} columns={columnsUser} title="Текущие заказы" />
      )}
      <div className={`border-b-2 border-dotted border-gray-700 py-2 my-3 `}></div>
      <OrderHistory />
      {delayOrderProduct.length > 0 && <DelayOrders delayOrderProduct={delayOrderProduct} />}
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
    </Layout>
  );
};
export default Orders;
