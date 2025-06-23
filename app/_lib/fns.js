/**
 * Converts a string representation of an amount to a comma-separated format
 * without decimal places.
 *
 * @param {string | number} amountValue The amount to format, typically a string like "3456.08"
 * or a number.
 * @returns {string} The formatted amount string (e.g., "3,456"), or an empty string
 * if the input is not a valid number.
 */
export function formatAmount(amountValue) {
  // 1. Convert the input value to a floating-point number.
  // parseFloat handles strings like "3456.08" correctly.
  const number = parseFloat(amountValue);

  // 2. Check if the conversion resulted in a valid, finite number.
  // Number.isFinite checks if it's a number and not NaN, Infinity, or -Infinity.
  if (!Number.isFinite(number)) {
    return ""; // Return an empty string or 'N/A' for invalid input
  }

  // 3. Use Intl.NumberFormat for robust, locale-aware formatting.
  //    - 'en-US' locale is used for comma as a thousand separator.
  //    - style: 'decimal' is default.
  //    - minimumFractionDigits: 0 ensures no decimal places are shown.
  //    - maximumFractionDigits: 0 ensures no decimal places are shown.
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true, // This is true by default but explicit for clarity
  });

  // 4. Format the number and return the result.
  return formatter.format(number);
}

/*
// Example Usage:
console.log(formatAmount("3456.08"));    // Expected: "3,456"
console.log(formatAmount("1234567.89")); // Expected: "1,234,567"
console.log(formatAmount("500"));       // Expected: "500"
console.log(formatAmount("0.99"));      // Expected: "1" (due to rounding to 0 decimal places)
console.log(formatAmount("0"));         // Expected: "0"
console.log(formatAmount("-123.45"));   // Expected: "-123"
console.log(formatAmount("not a number")); // Expected: ""
console.log(formatAmount(null));        // Expected: ""
console.log(formatAmount(undefined));   // Expected: ""
*/
