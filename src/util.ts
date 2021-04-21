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
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (Math.floor(num) / si[i].value).toFixed(2).replace(rx, "$1") + si[i].symbol
  );
}
