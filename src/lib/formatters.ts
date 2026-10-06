import { format, parseISO } from "date-fns";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

export function formatDate(value: string): string {
  return format(parseISO(value), "d MMM yyyy");
}
