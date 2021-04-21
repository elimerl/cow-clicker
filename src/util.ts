export function nFormatter(num: number) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: " thousand" },
    { value: 1e6, symbol: " million" },
    { value: 1e9, symbol: " billion" },
    { value: 1e12, symbol: " trillion" },
    { value: 1e15, symbol: " quadrillion" },
    { value: 1e18, symbol: " quintillion" },
    { value: 1e21, symbol: " sextillion" },
    { value: 1e24, symbol: " septillion" },
    { value: 1e27, symbol: " octillion" },
    { value: 1e30, symbol: " nonillion" },
    { value: 1e33, symbol: " decillion" },
    { value: 1e33, symbol: " decillion" },
    { value: 1e36, symbol: " undecillion" },
    { value: 1e39, symbol: " duodecillion" },
    { value: 1e42, symbol: " tredecillion" },
    { value: 1e45, symbol: " quattuordecillion" },
    { value: 1e48, symbol: " quindecillion" },
    { value: 1e51, symbol: " sexdecillion" },
    { value: 1e54, symbol: " septendecillion" },
    { value: 1e57, symbol: " octodecillion" },
    { value: 1e60, symbol: " novemdecillion" },
    { value: 1e63, symbol: " vigintillion" },
    { value: 1e303, symbol: " centillion" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    Math.floor(num / si[i].value)
      .toLocaleString("fullwide", { useGrouping: false })
      .replace(rx, "$1") + si[i].symbol
  );
}
