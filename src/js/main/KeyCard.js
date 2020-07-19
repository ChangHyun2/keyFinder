import { Tooltip } from "../utility/Tooltip";

export class KeyCard {
  constructor($parent, className, title, content = "") {
    this.$parent = $parent;
    this.className = className;
    this.title = title;
    this.content = content;

    this.render();
    this.bindEvent();
  }

  render() {
    if (!this.$el) {
      this.$el = document.createElement("div");
      this.$el.className = this.className.keyCard;
    }
    this.$el.innerHTML = `
      <h2 class=${this.className.title}>${this.title}</h2>
      <div class=${this.className.content}>${this.content}</div>
    `;

    this.$parent.append(this.$el);
  }

  setState(content) {
    this.content = content;
    this.render();
  }

  bindEvent() {
    const paste = (e) => {
      if (!navigator.clipboard) {
        alert("your broser doesn't support clipboard API!");
      }

      if (!this.toolTip) {
        this.toolTip = new Tooltip(
          this.$el,
          "toolTip",
          `${this.title} : ${this.content} is copied!`
        );
      } else {
        this.toolTip.setState(`${this.title} : ${this.content} is copied!`);
        this.toolTip.show();
      }

      setTimeout(() => this.toolTip.hide(), 700);
      const copiedText = this.content;
      navigator.clipboard.writeText(copiedText);
    };

    this.$el.addEventListener("click", paste);
  }
}
