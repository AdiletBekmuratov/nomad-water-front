import { useLazyGetAllConfirmedOrdersQuery } from '@/redux/services/courier.service';
import React from 'react';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import Loader from '../Landing/Loader';
import { WS_URL } from '@/redux/http';

export const Bell = () => {
  // const { data = [], isLoading } = useGetAllConfirmedOrdersQuery();
  const [fetch, { isLoading }] = useLazyGetAllConfirmedOrdersQuery();
  const [data, setData] = React.useState([]);

  const clientRef = React.useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = React.useState<boolean | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    //@ts-ignore
    fetch().then((res) => setData(res?.data));
    if (waitingToReconnect) {
      return;
    }
    if (!clientRef.current) {
      const client = new WebSocket(WS_URL + '/order/create');
      clientRef.current = client;
      client.onerror = (e) => console.error(e);

      client.onopen = () => {
        setIsOpen(true);
        console.log('ws opened');
      };

      client.onclose = () => {
        if (clientRef.current) {
          console.log('ws closed by server');
        } else {
          console.log('ws closed by app component unmount');
          return;
        }

        if (waitingToReconnect) {
          return;
        }

        setIsOpen(false);
        console.log('ws closed');
        setWaitingToReconnect(true);

        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (message) => {
        let newData = JSON.parse(message.data);
        //@ts-ignore
        setData((prev) => [...prev, newData]);
      };
    }
  }, [data, waitingToReconnect]);

  if (isLoading) {
    return <Loader />;
  }

  return data?.length > 0 ? <VscBellDot className="h-6 w-6" /> : <VscBell className="h-6 w-6" />;
};
