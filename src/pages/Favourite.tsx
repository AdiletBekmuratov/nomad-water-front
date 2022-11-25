//import { Card } from '../components/Crm/CardBottle';
// import { useState } from 'react';
import { CrmHeader } from '@/components/Crm/CrmHeader';

const Favourite = () => {
  // const [isAuth, setIsAuth] = useState(true);
  return (
    <div className={`w-full bg-bg-crm `}>
      <CrmHeader />
      <h1>Мои избранные</h1>
    </div>
  );
};
export default Favourite;
