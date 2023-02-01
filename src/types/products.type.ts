export type IProduct = {
  id?: number;
  imageUrl?: string;
  description: string;
  productCategoryId: number;
  productName: string;
  productPrice: number;
  createdDate?: string;
  updatedDate?:string;
  inStock?:boolean;
  inWarehouse?:boolean;


};

export type ICart = {
  total: number;
  products: (IProduct & { quantity: number })[];
};

export type IProductCreate = Omit<IProduct, 'image'> & { imageFile?: File | null };

export type IProductCategoryCreate = {
  id?: number;
  name: string;
};
