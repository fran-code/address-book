interface IError {
  message: string
}

export interface IErrorValues {
  error: IError
}

export interface ISaveAddress {
  name: string;
  telephone: string;
}

export interface IErrorsSaveAddress {
  name?: string;
  telephone?: string;
}

export interface IMessage {
  status: "success" | "error";
  title: string;
  time: number;
}

export interface IDataMessage {
  status: 'success' | 'error';
  title: string;
}

export interface ITableAddress {
  headings: string[]
  data: ISaveAddress[]
}

export interface ISearchInput {
  setFilterValue: Function
}

export interface IFilterTable {
  value: string | undefined;
  filterBy: "name" | "telephone";
}

export interface ICheckValuesNum {
  valuesForm: ISaveAddress
}