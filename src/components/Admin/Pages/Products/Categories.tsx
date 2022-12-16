import { Input } from '@/components/Forms';
import { useGetProductCategoryQuery } from '@/redux/services/base.service';
import { FC } from 'react';

export const Categories: FC = () => {
  const { data } = useGetProductCategoryQuery();

  return (
    <Input inputType="formik" as="select" name="productCategoryId" id="productCategoryId">
      <option>Выберите категорию</option>
      {data?.map((category) => (
        <option key={category.id} value={category.id} id="productCategoryId">
          {category.name}
        </option>
      ))}
    </Input>
  );
};
