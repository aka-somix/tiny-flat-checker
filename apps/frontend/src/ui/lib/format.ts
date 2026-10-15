const number = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const date = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" });

/** Prices carry no currency: the app is market-neutral. */
export const formatPrice = (value: number) => number.format(value);
export const formatDate = (iso: string) => date.format(new Date(iso));
