/**
 * Interface denotes the data type of product list
 */
export interface ProductData {
  id: number,
  name: string,
  price: number,
  description: string,
  created: string,
  modified: string,
  isDeleted: boolean
}
/**
 * Interface denotes the data type of product list
 */
export interface AllProducts {
  productList: ProductList,
  success: boolean
}
/**
 * Interface denotes the data type of product list
 */
export interface ProductList {
  count: number,
  rows: Array<ProductData>
}
/**
 * Interface denotes the data type for response of delete call
 */
export interface DeleteRes {
  deleteStatus: boolean,
  success: boolean
}
/**
 * Interface denotes the data type for response of getProduct call
 */
export interface OneProduct {
  productDetails: ProductData,
  success: boolean
}
/**
 * Interface denotes the data type for response of update call
 */
export interface UpdateProduct {
  updateStatus: boolean,
  success: boolean
}
/**
 * Interface denotes the data type for response of create call
 */
export interface CreateCallData {
  name: string,
  price: number,
  description: string,
}
/**
 * Interface for Api Error
 */
export interface ApiError {
  /**
   * It denotes status
   */
  success: boolean,
  /**
   * It denotes error details
   */
  error: {
    /**
     * It denotes error message
     */
    Error: string
  }
}