import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  useAddProductToWarehouseMutation,
  useGetAllProductsQuery,
  useGetProductCategoryQuery,
  useGetWarehouseIDQuery,
  useUpdateWarehouseBalanceMutation
} from '@/redux/services/base.service';
import { IProduct, IWarehouse, IWarehouseUpdateBalance } from '@/types';

import { toast } from 'react-hot-toast';
import { Layout } from '@/components/Layout';
import { Button, Input } from '@/components/Forms';

import { FiDelete } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';

const WarehouseTable = () => {
  const { id: warehouseIdUrl } = useParams();
  const { data: categories = [] } = useGetProductCategoryQuery();
  const { data: warehouse, isLoading: isWarehouseLoad } = useGetWarehouseIDQuery(
    Number(warehouseIdUrl)
  );
  let cloneBalance = warehouse ? [...warehouse.warehouseBalanceList] : [];

  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const [create] = useAddProductToWarehouseMutation();
  const [update] = useUpdateWarehouseBalanceMutation();

  const [valueSearch, setValueSearch] = useState('');
  const [valueQuantity, setValueQuantity] = useState<string[]>([]);

  const onChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setValueQuantity({ ...valueQuantity, [id]: event.target.value });
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
          success: 'Продукт добавлен',
          error: (error) => JSON.stringify(error, null, 2)
        }
      )
      .finally(() => {
        setValueQuantity([]);
      });
  };
  const handleUpdate = async (quantity: number, product: IProduct, id: number) => {
    toast
      .promise(update({ quantity, product, id }).unwrap(), {
        loading: 'Загрузка',
        success: 'Обновлено успешно',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setValueQuantity([]);
      });
  };

  const categoriesButStyle = `flex items-center justify-center py-2 px-3 
  rounded-2xl bg-white cursor-pointer`;
let quantityProd: number | null = null;
          
          let productInBalance: IProduct[];
          let prod: IProduct | undefined;
          let id: number | undefined;
  return (
    <Layout>
      <div className="grid gap-3">
        <div
          className={` flex flex-col md:flex-row flex-1 justify-evenly bg-light-blue rounded-lg 
      p-3 text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
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
        {products.map((product: IProduct) => {
          let proId = product.id!;
          if (warehouse) {
            if (warehouse.warehouseBalanceList) {
              productInBalance = warehouse.warehouseBalanceList.map((balance) => balance.product);
              if (productInBalance) {
                prod = productInBalance.find((product) => product.id! === proId);
                if (prod) {
                  id = prod.id;
                  if (id) {
                    if (warehouse) {
                      if (warehouse.warehouseBalanceList) {
                        if (warehouse.warehouseBalanceList[id]) {
                          quantityProd = warehouse.warehouseBalanceList[id].quantity;
                          
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          console.log(quantityProd);

          return (
            <div
              className={`grid grid-cols-1 lg:grid-cols-6  items-center gap-2 bg-light-blue rounded-lg 
          p-1 md:p-3 text-xs`}
              key={proId}>
              <h2 className={`text-dark-blue text-sm`}>
                <strong className="font-medium">ID: </strong>
                {proId}
              </h2>
              <h2 className={`text-dark-blue text-sm`}>
                <strong className="font-medium">Товар: </strong>
                {product.productName}
              </h2>
              <h2 className={`text-dark-blue text-sm`}>
                <strong className="font-medium">На складе: </strong>
                {quantityProd}
              </h2>
              <Input
                name={`${product.productName}`}
                inputType="default"
                id={`${product.productName}`}
                placeholder="Ввведите количество"
                value={valueQuantity[id!] || ''}
                onChange={(e) => onChangeQuantity(e, id!)}
              />
              {quantityProd === null ? (
                <Button
                  className={` hover:bg-blue-800`}
                  onClick={(e) => {
                    // prodId = e.currentTarget.value;
                    handleAdd(Number(valueQuantity[id!]), Number(proId), Number(warehouse!.id));
                  }}>
                  Добавить
                </Button>
              ) : (
                <Button
                  className={`bg-blue-900 hover:bg-blue-700`}
                  onClick={() =>
                    handleUpdate(Number(valueQuantity), product, Number(warehouse!.id))
                  }>
                  Обновить
                </Button>
              )}

              <Button className={`bg-red-500 hover:bg-blue-800`} disabled={quantityProd === null}>
                Убрать со склада
              </Button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default WarehouseTable;
