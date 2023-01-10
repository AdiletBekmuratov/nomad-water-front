export type IProduct = {
  id: number;
  imageUrl?: string;
  description: string;
  productCategoryId: number;
  productName: string;
  productPrice: number;
};

export type ICart = {
  total: number;
  products: (IProduct & { quantity: number })[];
};

export type IProductCreate = Omit<IProduct, 'image'> & { imageFile?: File | null };

export type IProductCategoryCreate = {
  id: number;
  name: string;
};

export type IProductImage = {
  id?: number;
  image: string;
};
