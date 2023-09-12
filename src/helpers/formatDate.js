export function formatDate(date) {
  const newDate = new Date(date);
  const options = { month: "long", day: "numeric", daySuffix: "ordinal" };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
}
