
export function formatDate(dateStr: string) {
  let year, month, day

  if (!dateStr) {
    return ""
  } else {
    year = dateStr.slice(0, 4);
    month = dateStr.slice(4, 6);
    day = dateStr.slice(6, 8);
  }


  return `${year}-${month}-${day}`;
}
