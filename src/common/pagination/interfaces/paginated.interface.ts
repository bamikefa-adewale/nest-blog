export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    TotalItems: number;
    currentPage: number;
    toatlPage: number;
  };
  links: {
    firstPage: string;
    lastPage: string;
    currentPage: string;
    nextPage: string;
    previousPage: string;
  };
}
