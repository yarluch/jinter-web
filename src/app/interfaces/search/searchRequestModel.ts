import {Filter} from "./filter";

export interface SearchRequestModel {
  filters: Array<Filter>,
  paginationParams: {
    page: number,
    pageSize: number
  },
  sortingMethod: number
}
