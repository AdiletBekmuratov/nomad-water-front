import { ICourierOrder } from '@/types/courier.types';
import { ColumnDef } from '@tanstack/react-table';
import React, { FC, useMemo, useState, useEffect, useRef } from 'react';
import { ActionButtons, Table } from '../../components/Table';
import {
  useCompleteOrderMutation,
  useGetCourierOrderQuery
} from '@/redux/services/courier.service';
import Loader from '../../components/Landing/Loader';
import { toast } from 'react-hot-toast';
import { Modal } from '../../components/Layout/Modal';
import { Button } from '../../components/Forms';
import { ConfirmOrder } from './ConfirmOrder';

export const AcceptOrder: FC = () => {
  //const { data, isLoading, refetch } = useGetAllConfirmedOrdersQuery();
  const {
    data: allOrdersCourier = [],
    isLoading: courierLoad,
    refetch
  } = useGetCourierOrderQuery();
  const data = allOrdersCourier.filter((order) => order.statusId === 2);
  const [complete] = useCompleteOrderMutation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [rowData, setRowData] = useState();
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
  const courierRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // setTimeout(() => {
  //   refetch();
  // }, 10000);

  useEffect(() => {}, [allOrdersCourier]);

  const handleComplete = async (id: number) => {
    await toast.promise(complete(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Подтвержден',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };

  return (
    <div>
      <div className="">
        <div>
          <ConfirmOrder />
        </div>
      </div>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="font-montserrat text-dark-blue">
          <p>Вы действительно хотите взять данный заказ?</p>
        </div>
        <div className="grid grid-cols-2 mt-2 gap-3">
          <Button
            buttonColor="bg-green-700 "
            onClick={() => {
              // @ts-ignore
              handleComplete(rowData?.id);
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
