import { Component } from "../common/Component";
import { Tooltip } from "../common/Tooltip";

export class KeyCard extends Component {
  constructor(config) {
    const {
      $parent,
      classes = {
        keyCard: "keyCard",
        title: "keyCard__title",
        content: "keyCard__content",
      },
      title,
      content = "",
      removeClipboardPopups,
    } = config;

    super("div", { $parent, classes: classes.keyCard });

    this.classes = { title: classes.title, content: classes.content };
    this.title = title;
    this.content = content;
    this.removeClipboardPopups = removeClipboardPopups;

    this.render();
    this.bindEvent();
  }

  render() {
    this.$el.innerHTML = `
      <h2 class=${this.classes.title}>${this.title}</h2>
      <div class=${this.classes.content}>${this.content}</div>
    `;
  }

  setState(content) {
    this.content = content;
    this.render();
  }

  bindEvent() {
    this.$el.addEventListener("click", () => this.clickHandler());
  }

  clickHandler() {
    // remove all keyCard popups
    // prevent showing popups more than one.
    this.removeClipboardPopups();
    this.copyToClipboard();
    this.showToolTip();

    this.toolTipTimer = setTimeout(() => this.toolTip.hide(), 700);
  }

  copyToClipboard() {
    if (!navigator.clipboard) {
      alert("your broser doesn't support clipboard API!");
    }
    const copiedText = this.content;
    navigator.clipboard.writeText(copiedText);
  }

  showToolTip() {
    if (!this.toolTip) {
      this.toolTip = new Tooltip({
        $parent: this.$el,
        classes: "toolTip",
        text: `${this.title} : ${this.content} is copied!`,
      });
    } else {
      this.toolTip.setState(`${this.title} : ${this.content} is copied!`);
      this.toolTip.show();
    }
  }
}
