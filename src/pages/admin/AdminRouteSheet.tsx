import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import { useState } from 'react';
import AllRouteSheets from '../Employee/AllRouteSheets';
import { Button } from '@/components/Forms';
import CourierRouteSheet from '../Employee/CourierRouteSheet';

const AdminRouteSheet = () => {
  const [tab, setTab] = useState(1);

  return (
    <LayoutAdmin>
      <div className="w-full h-16 bg-light-blue">
        <div className="flex justify-center items-center h-full gap-20">
          <div className="w-1/3">
            <Button
              buttonColor="bg-blue-400"
              onClick={() => {
                setTab(1);
              }}>
              Все маршруты
            </Button>
          </div>
          <div className="w-1/3">
            <Button
              buttonColor="bg-blue-400"
              onClick={() => {
                setTab(2);
              }}>
              Маршруты по курьеру
            </Button>
          </div>
        </div>
      </div>
      {tab === 1 && <AllRouteSheets />}
      {tab === 2 && <CourierRouteSheet />}
    </LayoutAdmin>
  );
};

export default AdminRouteSheet;
