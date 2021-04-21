<script lang="typescript">
  import { onMount } from "svelte";
  import { Buildings, BuildingsAsString, Game } from "./Game";
  import { nFormatter } from "./util";

  import Toastify from "toastify-js";
  import "toastify-js/src/toastify.css";
  import { createPopperActions } from "svelte-popperjs";

  const game = new Game((text) => {
    Toastify({
      duration: 3000,
      text,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: "#222",
      close: true,
    }).showToast();
  });
  if (localStorage.getItem("save"))
    game.decodeState(localStorage.getItem("save") as string);
  window.game = game;
  let count: number = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      localStorage.setItem("save", game.encodeState());
    });
  }

  let showTooltip: Record<string, boolean> = {};
  function updateState() {
    game.state.cows = game.state.cows;
    Object.keys(Buildings).forEach((key) => {
      //@ts-expect-error
      Buildings[key].cost = Buildings[key].cost;
    });
  }
  let time: number;
  function tick(timestamp: number) {
    Object.values(Buildings).forEach((bldg) => {
      bldg.tick(game, (timestamp - (isNaN(time) ? 0 : time)) / 1000);
    });
    time = timestamp;
    updateState();
    requestAnimationFrame(tick);
  }
  let longTimeNoSee: number;
  document.onvisibilitychange = (ev) => {
    console.log(document.hidden);
    if (document.hidden) {
      longTimeNoSee = Date.now();
      localStorage.setItem("save", game.encodeState());
    } else {
      Object.values(Buildings).forEach((bldg) => {
        bldg.tick(game, (Date.now() - longTimeNoSee) / 1000);
      });
      localStorage.setItem("save", game.encodeState());
    }
  };
  requestAnimationFrame(tick);
  document.addEventListener(
    "keydown",
    function (e) {
      if (
        (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
        e.keyCode == 83
      ) {
        e.preventDefault();
        localStorage.setItem("save", game.encodeState());
        // Process the event here (such as click on submit button)
      }
    },
    false
  );
  setInterval(() => {
    localStorage.setItem("save", game.encodeState());
  }, 15000);
</script>

<div class="App">
  <div class="big-cow">
    <p>{nFormatter(game.state.cows)} cow{game.state.cows === 1 ? "" : "s"}</p>
    <p>{nFormatter(game.getCps())} cows per second</p>

    <div
      class="big-cow-click"
      on:click={() => {
        game.click();
        updateState();
      }}
    >
      <div>🐄</div>
    </div>
  </div>
  <div class="store">
    Stuff to buy
    <ul>
      {#each Object.keys(Buildings) as key}
        <li>
          <button
            on:mouseenter={() => (showTooltip[key] = true)}
            on:mouseleave={() => (showTooltip[key] = false)}
            on:click={() => {
              BuildingsAsString[key].buy(game);
              updateState();
            }}
            >{key} ({BuildingsAsString[key].count}) - {nFormatter(
              BuildingsAsString[key].cost
            )} cows
          </button>
          {#if showTooltip[key]}
            <div class="tooltip">{BuildingsAsString[key].tooltip}</div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  .App {
    text-align: center;
    font-size: 1.2em;
  }
  .big-cow {
    left: calc(50% - 10em);
    top: 0;
    position: absolute;
  }
  .big-cow-click {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 15em;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
    animation-duration: 0.2s;
  }
  .big-cow-click:active {
    animation-name: scale-easeOutElastic;
  }
  .store {
    text-align: left;
    margin: 10px;
    top: 10px;
    position: absolute;
  }
  @keyframes scale-easeOutElastic {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  .tooltip {
    background-color: #222;
    color: white;
    padding: 5px 10px;
    border-radius: 2px;
    font-size: 13px;
    z-index: 1;
    margin-top: 4px;
    position: absolute;
  }
</style>
