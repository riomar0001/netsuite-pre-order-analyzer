import type { RowData, AddressInfo, OrderError } from './types';
import { norm, validateRow } from './validate';

export function parseTsvFile(text: string): {
  rows: RowData[];
  mkoErrors: Record<string, OrderError[]>;
} {
  const lines = text.split('\n');
  const rows: RowData[] = [];
  const mkoData: Record<string, {
    addresses: Map<string, AddressInfo>;
    skuTracker: Record<string, number[]>;
  }> = {};

  lines.forEach((line, index) => {
    const cl = line.replace(/\r/g, '');
    if (!cl.trim() || cl.trim().startsWith('[')) return;
    const p = cl.split('\t');
    if (p.length < 10) return;

    const row: RowData = {
      rowIndex: index,
      mko:        p[0]?.trim()  ?? '', shipmentNum: p[1]?.trim()  ?? '',
      custAcct:   p[2]?.trim()  ?? '', wo:          p[3]?.trim()  ?? '',
      sku:        p[4]?.trim()  ?? '', itemDesc:    p[5]?.trim()  ?? '',
      qty:        p[6]?.trim()  ?? '', ormd:        p[7]?.trim()  ?? '',
      shipComp:   p[8]?.trim()  ?? '', name:        p[9]?.trim()  ?? '',
      addr1:      p[10]?.trim() ?? '', addr2:       p[11]?.trim() ?? '',
      city:       p[12]?.trim() ?? '', state:       p[13]?.trim() ?? '',
      zip:        p[14]?.trim() ?? '', country:     p[15]?.trim() ?? '',
      phone:      p[16]?.trim() ?? '', shipMethod:  p[17]?.trim() ?? '',
      hub:        p[18]?.trim() ?? '', hubDesig:    p[19]?.trim() ?? '',
      dcId:       p[20]?.trim() ?? '', batchId:     p[21]?.trim() ?? '',
      fieldErrors: null,
    };

    row.fieldErrors = validateRow(row as unknown as Record<string, string>);
    rows.push(row);

    // Normalize address for comparison — exclude name so minor name differences
    // between line items don't cause false Multiple Address flags
    const addrKey = [row.addr1, row.addr2, row.city, row.state, row.zip, row.country]
      .map(norm).join('|');

    if (!mkoData[row.mko]) mkoData[row.mko] = { addresses: new Map(), skuTracker: {} };
    if (!mkoData[row.mko].addresses.has(addrKey)) {
      mkoData[row.mko].addresses.set(addrKey, {
        addr1: row.addr1, addr2: row.addr2, city: row.city,
        state: row.state, zip: row.zip, country: row.country,
      });
    }

    if (row.sku) {
      if (!mkoData[row.mko].skuTracker[row.sku]) mkoData[row.mko].skuTracker[row.sku] = [];
      mkoData[row.mko].skuTracker[row.sku].push(index + 1);
    }
  });

  const mkoErrors: Record<string, OrderError[]> = {};
  Object.entries(mkoData).forEach(([mko, data]) => {
    mkoErrors[mko] = [];
    if (data.addresses.size > 1) {
      mkoErrors[mko].push({
        type: 'Multiple Addresses',
        addresses: [...data.addresses.values()],
        details: data.addresses.size + ' different addresses',
      });
    }
    Object.entries(data.skuTracker).forEach(([sku, rr]) => {
      if (rr.length > 1)
        mkoErrors[mko].push({
          type: 'Duplicate SKU',
          sku,
          details: `SKU "${sku}" appears ${rr.length} times (rows: ${rr.join(', ')})`,
        });
    });
    if (mkoErrors[mko].length === 0) delete mkoErrors[mko];
  });

  return { rows, mkoErrors };
}
