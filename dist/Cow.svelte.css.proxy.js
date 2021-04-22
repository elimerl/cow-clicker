// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "*{margin:0;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n      Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif}.App.svelte-12114nx{text-align:center;font-size:1.2em}.big-cow.svelte-12114nx{left:calc(50% - 10em);top:0;position:absolute}.big-cow-click.svelte-12114nx{display:flex;justify-content:center;align-items:center;cursor:pointer;font-size:15em;-webkit-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;user-select:none;animation-duration:0.2s}.big-cow-click.svelte-12114nx:active{animation-name:svelte-12114nx-scale-easeOutElastic}.store.svelte-12114nx{text-align:left;margin:10px;top:10px;position:absolute}button.svelte-12114nx{background-color:#222;color:white;border:none;border-radius:4px;padding:0.5rem;margin-top:0.5rem;transition:background-color 1s;cursor:pointer}@keyframes svelte-12114nx-scale-easeOutElastic{0%{transform:scale(1)}50%{transform:scale(0.9)}100%{transform:scale(1)}}.tippy-box[data-theme~=\"black\"]{background-color:#222;color:white}li.svelte-12114nx{margin:0;padding:0}ul.svelte-12114nx{margin:0;margin-left:10px;list-style:none;padding:0}.big-text.svelte-12114nx{font-size:larger}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}