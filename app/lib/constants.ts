import type { Constraint } from './types';

export const CONSTRAINTS: Record<string, Constraint> = {
  mko:        { label: 'Order Number',                type: 'VARCHAR', max: 30 },
  shipmentNum:{ label: 'Shipment Number',             type: 'VARCHAR', max: 32 },
  custAcct:   { label: 'Ipsy Customer Account Number',type: 'VARCHAR', max: 100 },
  wo:         { label: 'Order Type',                  type: 'VARCHAR', max: 10 },
  sku:        { label: 'SKU',                         type: 'VARCHAR', max: 20 },
  itemDesc:   { label: 'Item Description',            type: 'VARCHAR', max: 125 },
  qty:        { label: 'Quantity',                    type: 'NUMERIC' },
  ormd:       { label: 'ORMD Flag',                   type: 'VARCHAR', max: 10 },
  shipComp:   { label: 'Ship To Company',             type: 'VARCHAR', max: 100 },
  name:       { label: 'Ship To Name',                type: 'VARCHAR', max: 150 },
  addr1:      { label: 'Ship To Address1',            type: 'VARCHAR', max: 100 },
  addr2:      { label: 'Ship To Address2',            type: 'VARCHAR', max: 45 },
  city:       { label: 'Ship To City',                type: 'VARCHAR', max: 100 },
  state:      { label: 'Ship To State',               type: 'VARCHAR', max: 30 },
  zip:        { label: 'Ship To Zip',                 type: 'VARCHAR', min: 5 },
  country:    { label: 'Ship To Country',             type: 'VARCHAR', max: 12 },
  phone:      { label: 'Ship To Phone',               type: 'VARCHAR', max: 25 },
  shipMethod: { label: 'Shipping Method',             type: 'VARCHAR', max: 20 },
  hub:        { label: 'Hub',                         type: 'VARCHAR', max: 20 },
};

export const COLUMNS = [
  { label: 'Order Number',     key: 'mko' },
  { label: 'Shipment Number',  key: 'shipmentNum' },
  { label: 'Cust Acct #',      key: 'custAcct' },
  { label: 'Order Type',       key: 'wo' },
  { label: 'SKU',              key: 'sku', mono: true },
  { label: 'Item Description', key: 'itemDesc' },
  { label: 'Qty',              key: 'qty', center: true },
  { label: 'ORMD',             key: 'ormd', center: true },
  { label: 'Ship To Company',  key: 'shipComp' },
  { label: 'Ship To Name',     key: 'name' },
  { label: 'Address 1',        key: 'addr1' },
  { label: 'Address 2',        key: 'addr2' },
  { label: 'City',             key: 'city' },
  { label: 'State',            key: 'state' },
  { label: 'Zip',              key: 'zip' },
  { label: 'Country',          key: 'country' },
  { label: 'Phone',            key: 'phone' },
  { label: 'Ship Method',      key: 'shipMethod' },
  { label: 'Hub',              key: 'hub' },
  { label: 'Hub Designator',   key: 'hubDesig' },
  { label: 'DC ID',            key: 'dcId' },
  { label: 'Batch ID',         key: 'batchId' },
];

export const badgeColor = (t: string) => {
  if (t === 'Multiple Addresses') return 'bg-red-100 text-red-800';
  if (t === 'Duplicate SKU')      return 'bg-amber-100 text-amber-800';
  return 'bg-orange-100 text-orange-800';
};

export const badgeShort = (t: string) => {
  if (t === 'Multiple Addresses') return 'Multi Addr';
  if (t === 'Duplicate SKU')      return 'Dup SKU';
  return 'Constraint';
};
