// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "*{margin:0;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n      Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif}.App.svelte-2ayfn{text-align:center;font-size:1.2em}.big-cow.svelte-2ayfn{left:calc(50% - 10em);top:0;position:absolute}.big-cow-click.svelte-2ayfn{display:flex;justify-content:center;align-items:center;cursor:pointer;font-size:15em;-webkit-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;user-select:none;animation-duration:0.2s}.big-cow-click.svelte-2ayfn:active{animation-name:svelte-2ayfn-scale-easeOutElastic}.store.svelte-2ayfn{text-align:left;margin:10px;top:10px;position:absolute}button.svelte-2ayfn{background-color:#222;color:white;border:none;border-radius:4px;padding:0.5rem;margin-top:0.5rem;transition:background-color 0.2s}@keyframes svelte-2ayfn-scale-easeOutElastic{0%{transform:scale(1)}50%{transform:scale(0.9)}100%{transform:scale(1)}}.tippy-box[data-theme~=\"black\"]{background-color:black;color:white}li.svelte-2ayfn{margin:0;padding:0}ul.svelte-2ayfn{margin:0;margin-left:10px;list-style:none;padding:0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}