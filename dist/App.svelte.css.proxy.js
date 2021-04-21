// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;font-family:Arial, Helvetica, sans-serif}.App.svelte-l1kj7r{text-align:center;font-size:1.2em}.big-cow.svelte-l1kj7r{left:calc(50% - 10em);top:0;position:absolute}.big-cow-click.svelte-l1kj7r{display:flex;justify-content:center;align-items:center;cursor:pointer;font-size:15em;-webkit-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;user-select:none;animation-duration:0.2s}.big-cow-click.svelte-l1kj7r:active{animation-name:svelte-l1kj7r-scale-easeOutElastic}.store.svelte-l1kj7r{text-align:left;margin:10px;top:10px;position:absolute}button.svelte-l1kj7r{background-color:#222;color:white;border:none;border-radius:4px;padding:0.5rem;margin-top:0.5rem}@keyframes svelte-l1kj7r-scale-easeOutElastic{0%{transform:scale(1)}50%{transform:scale(0.9)}100%{transform:scale(1)}}.tippy-box[data-theme~=\"black\"]{background-color:black;color:white}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}