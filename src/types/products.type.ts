export type IProduct = {
  id?: number;
  image?: string;
  description: string;
  productCategoryId: number;
  productName: string;
  productPrice: number;
  urgencyPrice: number;
};

export type IProductCreate = Omit<IProduct, 'image'>;

export type IProductCategoryCreate = {
  id?: number;
  name: string;
};

export type IProductImage = {
  id?: number;
  image: string;
};
