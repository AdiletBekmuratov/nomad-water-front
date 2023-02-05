import { Button, Input } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';
import { useLazyGetCourierRouteSheetOrdersQuery } from '@/redux/services/courier.service';
import { useGetUserROLEQuery } from '@/redux/services/user.service';
import { Form, Formik } from 'formik';
import { useRef, useState, useEffect } from 'react';
import RouteSheetTable from '../Couriers/RouteSheetTable';
import * as yup from 'yup';
import { IRouteSheet, IRouteSheetOrders } from '@/types/routeSheet.types';
import { useReactToPrint } from 'react-to-print';

const CourierRouteSheet = () => {
  const { data: couriers = [] } = useGetUserROLEQuery('ROLE_COURIER');
  const componentRef = useRef<any>();

  const [currentDate, setCurrentDate] = useState<string>('');
  const [routeSheetCourier, setRouteSheet] = useState<IRouteSheetOrders[] | null>(null);

  const [fetch, { isLoading }] = useLazyGetCourierRouteSheetOrdersQuery();

  const findRoute = (values: { id: number; date: string }) => {
    let year = values.date.substring(0, 4);
    let month = values.date.substring(5, 7);
    let day = values.date.substring(8);
    setCurrentDate(`${day}-${month}-${year}`);
    let value = {
      id: values.id,
      date: `${day}-${month}-${year}`
    };
    fetch(value).then((res) => {
      setRouteSheet(res.data ? res.data.routeSheetOrders : null);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Маршрутный лист за${currentDate}`
  });
  const validateSchema = yup.object().shape({
    id: yup.string().required(),
    date: yup.string().required()
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center font-montserrat">
      Выберите дату заказов
      <Formik
        initialValues={{ date: '', id: 1 }}
        onSubmit={(values) => findRoute(values)}
        validationSchema={validateSchema}>
        {(isValid) => (
          <Form>
            <Input inputType="formik" id="date" name="date" type="date" />
            Выберите курьера
            <Input as="select" inputType="formik" id="id" name="id">
              <option value="">Выберите курьера</option>
              {couriers.map((cour) => (
                <option
                  key={cour.id}
                  value={cour.id}>{`${cour.firstname} ${cour.lastname}`}</option>
              ))}
            </Input>
            <div className="w-6/8 mx-auto mt-3">
              <Button disabled={!isValid} type="submit">
                Найти маршрутный лист
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center font-montserrat">
        {!routeSheetCourier ? (
          <div>На данную дату нет маршрутного листа</div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="w-1/3 mt-3">
              <Button onClick={handlePrint}>Печать</Button>
            </div>
            <RouteSheetTable
              routeSheet={routeSheetCourier}
              componentRef={componentRef}
              date={currentDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourierRouteSheet;
