import { RegByPhone } from '../components/RegByPhone';
import { useState } from 'react';
import { CrmHeader } from '@/components/Crm/CrmHeader';
import { Catalog } from '@/components/Crm';

const MainCrm = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <div className={`w-full bg-bg-crm `}>
      <CrmHeader />
      {isAuth ? (
        <Catalog />
      ) : (
        <div className={`h-screen py-4 px-10 lg:px-48`}>
          <RegByPhone />
        </div>
      )}
    </div>
  );
};
export default MainCrm;
