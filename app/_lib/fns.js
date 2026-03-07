export function formatAmount(amountValue) {
  const number = parseFloat(amountValue);

  if (!Number.isFinite(number)) {
    return "";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });

  return formatter.format(number);
}
