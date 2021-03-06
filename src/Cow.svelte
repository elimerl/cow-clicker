<script lang="typescript">
  import { onMount } from "svelte";
  import { Buildings, BuildingsAsString, Game } from "./Game";
  import { nFormatter } from "./util";

  import Toastify from "toastify-js";
  import "toastify-js/src/toastify.css";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css"; // optional for styling
  import { fly, fade } from "svelte/transition";
  import { onUnlockListen } from "./Building";

  const game = new Game((text) => {
    Toastify({
      duration: 1000,
      text,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      close: true,
      //@ts-expect-error
      style: { background: "#222" },
    }).showToast();
  });
  if (localStorage.getItem("save"))
    game.decodeState(localStorage.getItem("save") as string);
  window.game = game;

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      localStorage.setItem("save", game.encodeState());
    });
  }
  let showTooltip: Record<string, boolean> = {};
  let buttons: Record<string, HTMLButtonElement> = {};
  onUnlockListen((bldg) => {
    const key = bldg.constructor.name;
    requestAnimationFrame(() => {
      tippy(buttons[key], {
        content: bldg.tooltip + " " + nFormatter(bldg.cps) + " cows per second",
        placement: "right",
        arrow: false,
        theme: "black",
        maxWidth: "400em",
        allowHTML: true,
      });
    });
  });
  onMount(() => {
    Object.keys(buttons).forEach((key) => {
      let content =
        BuildingsAsString[key].tooltip +
        " " +
        nFormatter(BuildingsAsString[key].cps) +
        " cows per second";
      tippy(buttons[key], {
        content,
        placement: "right",
        arrow: false,
        theme: "black",
        maxWidth: "400em",
        animateFill: true,
        allowHTML: true,
      });
    });
  });
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
    if (!document.hidden) requestAnimationFrame(tick);
  }
  // let longTimeNoSee: number;
  // document.onvisibilitychange = (ev) => {
  //   if (document.hidden) {
  //     longTimeNoSee = Date.now();
  //     localStorage.setItem("save", game.encodeState());
  //   } else {
  //     Object.values(Buildings).forEach((bldg) => {
  //       bldg.tick(game, (Date.now() - longTimeNoSee) / 1000);
  //     });
  //     localStorage.setItem("save", game.encodeState());
  //   }
  // };
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
    <div class="big-text">
      <p>{nFormatter(game.state.cows)} cow{game.state.cows === 1 ? "" : "s"}</p>

      <p>{nFormatter(game.getCps())} cows per second</p>
    </div>
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
    <ul>
      Stuff to buy
      {#each Object.keys(Buildings) as key}
        {#if BuildingsAsString[key].unlocked}<li>
            <button
              on:mouseenter={() => {
                showTooltip[key] = true;
              }}
              on:mouseleave={() => {
                showTooltip[key] = false;
              }}
              on:click={() => {
                BuildingsAsString[key].buy(game);
                updateState();
              }}
              style={game.state.cows <= BuildingsAsString[key].cost
                ? "background:#666"
                : ""}
              bind:this={buttons[key]}
              in:fly={{ y: 200, duration: 1000 }}
              out:fade
            >
              {key} ({BuildingsAsString[key].count.toLocaleString("fullwide", {
                useGrouping: false,
              })}) - {nFormatter(BuildingsAsString[key].cost)} cows
            </button>
          </li>{/if}
      {/each}
    </ul>
  </div>
</div>

<style>
  :global(*) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  button {
    background-color: #222;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    transition: background-color 1s;
    cursor: pointer;
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
  :global(.tippy-box[data-theme~="black"]) {
    background-color: #222;
    color: white;
  }
  li {
    margin: 0;
    padding: 0;
  }
  ul {
    margin: 0;
    margin-left: 10px;
    list-style: none;
    padding: 0;
  }
  .big-text {
    font-size: larger;
  }
</style>
