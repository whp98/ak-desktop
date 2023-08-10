export default function jsonMapToArray(
  jsonMap: Record<string, Record<string, number | string>>,
): (number | string)[][] {
  const rows: (number | string)[][] = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const rowKey in jsonMap) {
    const row = jsonMap[rowKey];
    const rowArray: (number | string)[] = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const colKey in row) {
      rowArray.push(
        row[colKey] ? row[colKey].toString().replace('T00:00:00.000', '') : row[colKey],
      );
    }
    rows.push(rowArray);
  }
  return rows;
}
