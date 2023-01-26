import { useState } from 'react';
import { useParams } from 'react-router';
import {
  useAddProductToWarehouseMutation,
  useGetAllProductsQuery,
  useGetProductCategoryQuery,
  useGetWarehouseIDQuery
} from '@/redux/services/base.service';
import { IProduct, IWarehouseBalance } from '@/types';

import { Layout } from '@/components/Layout';
import { Button, Input } from '@/components/Forms';

import { FiDelete } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

const WarehouseTable = () => {
  const { id: warehouseId } = useParams();
  const { data: categories = [] } = useGetProductCategoryQuery();
  const { data: warehouse } = useGetWarehouseIDQuery(Number(warehouseId));
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const [create, { isLoading: createLoad }] = useAddProductToWarehouseMutation();

  const [valueSearch, setValueSearch] = useState('');
  const [valueQuantity, setValueQuantity] = useState('');
  const searchArrName = products.filter((items: IProduct) =>
    items.productName.toLowerCase().includes(valueSearch.toLowerCase())
  );
  const onChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };
  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueQuantity(event.target.value);
  };
  const handleAdd = (quantity: number, productId: number, warehouseId: number) => {
    toast
      .promise(
        create({ quantity, productId, warehouseId })
          .unwrap()
          .then((resp) => {
            console.log(resp);
            // setResponse(()=>resp);
          }),
        {
          loading: 'Загрузка...',
          success: 'Новый адрес сохранен',
          error: (error) => JSON.stringify(error, null, 2)
        }
      )
      .finally(() => {
        setValueQuantity('');
      });
  };
  const categoriesButStyle = `flex items-center justify-center py-2 px-3 
  rounded-2xl bg-white cursor-pointer`;
  let quantityProd: number | null = null;
  return (
    <Layout>
      <div className="grid gap-3">
        <div
          className={` flex flex-col md:flex-row flex-1 justify-evenly bg-light-blue rounded-lg 
      p-1 md:p-3 text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
          <span>
            <strong>ID:</strong>
            {` ${warehouse?.id ? warehouse.id : 'ID'} `}
          </span>
          <span>
            <strong>Адрес: </strong>
            {` ${warehouse?.warehouseAddress ? warehouse.warehouseAddress : 'Адрес'} `}
          </span>
          <span>
            <strong>Телефон склада:</strong>
            {` ${warehouse?.phone ? warehouse.phone : '+7 777 777 77 77'} `}
          </span>

          <span>
            <strong>Дата обновления: </strong>
            {` ${warehouse?.updatedDate ? warehouse.updatedDate : 'Дата обновления'} `}
          </span>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 items-center `}>
          {/* поиск */}
          <Input
            id="search"
            name="search"
            value={valueSearch}
            onChange={onChangeInputSearch}
            inputType="default"
            placeholder="Поиск..."
            className="rounded-2xl"
            leftIcon={<AiOutlineSearch />}
            rightIcon={
              <FiDelete
                className={`cursor-pointer block ${valueSearch === '' && 'hidden'}`}
                onClick={() => setValueSearch('')}
              />
            }
          />
          {/* кнопки для сортировки по категориям */}
          <div className={`grid sm:grid-cols-3 gap-4 md:gap-4`}>
            {categories.map((item) => (
              <button
                value={item.name}
                key={item.name}
                className={`${categoriesButStyle}`}
                //@ts-ignore
                onClick={() => onChoiceButton(item.id.toString())}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
                    fill="#023646"
                  />
                  <path
                    d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
                    fill="#023646"
                  />
                </svg>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
        {products.map((product) => (
          <div
            className={`grid grid-cols-1 lg:grid-cols-5  items-center gap-2 bg-light-blue rounded-lg 
          p-1 md:p-3 text-xs`}
            key={product.id}>
            <h2 className={`text-dark-blue text-sm`}>
              <strong className="font-medium">Товар: </strong>
              {product.productName}
            </h2>
            <h2 className={`text-dark-blue text-sm`}>
              {warehouse ? (
                warehouse.warehouseBalanceList[product.id] ? (
                  <>
                    <strong className="font-medium">На складе: </strong>
                    {(quantityProd = warehouse.warehouseBalanceList[product.id].quantity)}
                  </>
                ) : (
                  <>
                    <strong className="font-medium">На складе: </strong>
                    {((quantityProd = null), quantityProd === null && '0')}
                  </>
                )
              ) : null}
            </h2>
            <Input
              inputType="default"
              id="quantity"
              placeholder="Ввведите количество"
              value={valueQuantity}
              onChange={onChangeQuantity}
            />
            {quantityProd === null ? (
              <Button
                className={`hover:bg-blue-800`}
                onClick={() =>
                  handleAdd(Number(valueQuantity), Number(product.id), Number(warehouse!.id))
                }>
                Добавить
              </Button>
            ) : (
              <Button
                className={`hover:bg-blue-800`}
                onClick={() =>
                  handleAdd(Number(valueQuantity), Number(product.id), Number(warehouse!.id))
                }>
                Изменить
              </Button>
            )}

            <Button className={`hover:bg-blue-800`} disabled={quantityProd === 0}>
              Убрать со склада
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default WarehouseTable;
