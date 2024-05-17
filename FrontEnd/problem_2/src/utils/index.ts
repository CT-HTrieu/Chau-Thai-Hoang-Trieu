

export const formatStringToNumber = (str: string) => {
  return Number(str.replace(/,/g, ''));
}

export const formatNumberToString = (value: number) => {
  if (value === null || value === undefined) return 0;
  const formattedValue = value.toString()
    .replace(/[^\d.]/g, '')
    .replace(/^\./, '')
    .replace(/\.(?=.*\.)/g, '') 
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
  return formattedValue;
}

export const numberToString = (value: string) => {
  if (value === null || value === undefined) return 0;
  const formattedValue = value.toString()
    .replace(/[^\d.]/g, '')
    .replace(/^\./, '')
    .replace(/\.(?=.*\.)/g, '') 
    .replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
  return formattedValue;
}

