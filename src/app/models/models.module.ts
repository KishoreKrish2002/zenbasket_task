export interface Rows {
  id: number,
  name: string,
  price: number,
  description: string,
  created: string,
  modified: string,
  isDeleted: boolean
}

export interface AllProducts {
  productList: ProductList,
  success: boolean
}

export interface ProductList {
  count: number,
  rows: Array<Rows>
}

export interface DeleteRes {
  deleteStatus: boolean,
  success: boolean
}

export interface OneProduct {
  productDetails: Rows,
  success: boolean
}

export interface updateProduct {
  updateStatus: boolean,
  success: boolean
}

export interface createCallData {
  name: string,
  price: number,
  description: string,
}