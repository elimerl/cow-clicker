// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;font-family:Arial, Helvetica, sans-serif}.App.svelte-szu782{text-align:center;font-size:1.2em}.big-cow.svelte-szu782{left:calc(50% - 10em);top:0;position:absolute}.big-cow-click.svelte-szu782{display:flex;justify-content:center;align-items:center;cursor:pointer;font-size:15em;-webkit-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;user-select:none;animation-duration:0.2s}.big-cow-click.svelte-szu782:active{animation-name:svelte-szu782-scale-easeOutElastic}.store.svelte-szu782{text-align:left;margin:10px;top:10px;position:absolute}@keyframes svelte-szu782-scale-easeOutElastic{0%{transform:scale(1)}50%{transform:scale(0.9)}100%{transform:scale(1)}}.tooltip.svelte-szu782{background-color:#222;color:white;padding:5px 10px;border-radius:2px;font-size:13px;z-index:1;margin-top:4px;position:absolute}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}