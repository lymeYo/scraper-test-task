export const convertToCSV = (data) => {
  if (!data) return ''
  
  const header = Object.keys(data[0]);
  const headerString = header.join(',');
  const replacer = (key, value) => value ?? '';
  const rowItems = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv
}