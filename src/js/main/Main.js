import { Component } from "../common/Component";
import { KeyCard } from "./KeyCard";

export class Main extends Component {
  constructor(config) {
    const {
      $parent,
      classes = {
        main: "main",
        keyCode: "keyCode",
        keyCards: "keyCards",
      },
    } = config;
    const { main, keyCode, keyCards } = classes;
    super("div", { $parent, classes: main });
    this.classes = { keyCode, keyCards };
  }

  render() {
    const { keyCode, keyCards } = this.classes;
    this.$el.innerHTML = `
      <p class="${keyCode}"></p>
      <div class="${keyCards}"></div>
    `;
  }

  fetchKeyCards() {
    const titles = ["e.key", "e.keyCode", "e.code"];
    const config = {
      $parent: this.$el.querySelector(".keyCards"),
      removeClipboardPopups: this.removeClipboardPopups.bind(this),
    };

    this.keyCards = titles.map((title) => new KeyCard({ title, ...config }));
  }

  // remove all keyCard popups
  // prevent showing popups more than one.
  removeClipboardPopups() {
    this.keyCards.forEach((keyCard) => {
      keyCard.toolTip && keyCard.toolTip.hide();
      clearTimeout(keyCard.toolTipTimer);
    });
  }

  // handler functions used in App.js
  updateKeyCode(e) {
    this.keyCode = this.$el.querySelector(".keyCode");
    this.keyCode.textContent = e.keyCode;
  }

  updateKeyCards(e) {
    const [key, keyCode, code] = this.keyCards;

    key.setState(e.keyCode === 32 ? "(Space character)" : e.key);
    keyCode.setState(e.keyCode);
    code.setState(e.code);
  }
}
