import { KeyCard } from "./KeyCard";

export class Main {
  constructor($parent, className) {
    this.$parent = $parent;
    this.className = className;
  }

  static clipTimeOut = null;

  render() {
    this.$el = document.createElement("div");
    this.$el.className = this.className;
    this.$el.innerHTML = `
      <p class="keyCode"></p>
      <div class="keyCards"></div>
    `;
    this.$parent.append(this.$el);
  }

  fetchCards() {
    this.keyCards = ["key", "keyCode", "code"].map(
      (title) =>
        new KeyCard(
          this.$el.querySelector(".keyCards"),
          {
            keyCard: "keyCard",
            title: "keyCard__title",
            content: "keyCard__content",
          },
          title
        )
    );
    this.bindClipBoard();
  }

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

  bindClipBoard() {
    const clickHandler = (i) => {
      const keyCard = this.keyCards[i];

      if (!navigator.clipboard) {
        alert("your broser doesn't support clipboard API!");
      }

      // to remove afterimage
      this.keyCards.forEach((keyCard) => {
        keyCard.toolTip && keyCard.toolTip.hide();
        clearTimeout(keyCard.toolTipTimer);
      });

      // set keyCard toolTip
      if (!keyCard.toolTip) {
        keyCard.toolTip = new Tooltip(
          keyCard.$el,
          "toolTip",
          `${keyCard.title} : ${keyCard.content} is copied!`
        );
      } else {
        keyCard.toolTip.setState(
          `${keyCard.title} : ${keyCard.content} is copied!`
        );
        keyCard.toolTip.show();
      }
      keyCard.toolTipTimer = setTimeout(() => keyCard.toolTip.hide(), 700);

      const copiedText = keyCard.content;
      navigator.clipboard.writeText(copiedText);
    };
    this.keyCards.forEach((keyCard, i) =>
      keyCard.$el.addEventListener("click", clickHandler.bind(null, i))
    );
  }
}
