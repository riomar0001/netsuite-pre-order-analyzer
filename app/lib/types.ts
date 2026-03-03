export type Constraint = { label: string; type: string; max?: number; min?: number };

export type RowData = {
  rowIndex: number;
  mko: string; shipmentNum: string; custAcct: string; wo: string; sku: string;
  itemDesc: string; qty: string; ormd: string; shipComp: string; name: string;
  addr1: string; addr2: string; city: string; state: string; zip: string;
  country: string; phone: string; shipMethod: string; hub: string;
  hubDesig: string; dcId: string; batchId: string;
  fieldErrors: Record<string, string[]> | null;
};

export type AddressInfo = {
  addr1: string; addr2: string; city: string;
  state: string; zip: string; country: string;
};

export type OrderError =
  | { type: 'Multiple Addresses'; addresses: AddressInfo[]; details: string }
  | { type: 'Duplicate SKU'; sku: string; details: string };

export type AllError = {
  category: string; field: string | null; message: string;
  addresses?: AddressInfo[];
};

export type GroupEntry = { orderErrors: OrderError[]; constraintRows: RowData[] };
