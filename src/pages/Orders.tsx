import { CrmHeader } from '@/components/Crm/CrmHeader';

const Orders = () => {
  // const [isAuth, setIsAuth] = useState(true);
  return (
    <div className={`w-full bg-bg-crm `}>
      <CrmHeader />
      <h1>Мои заказы</h1>
    </div>
  );
};
export default Orders;
