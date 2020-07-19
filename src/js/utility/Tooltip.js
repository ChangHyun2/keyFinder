export class Tooltip {
  constructor($parent, className, text) {
    this.$parent = $parent;
    this.className = className;
    this.text = text;
    this.render();
  }

  render() {
    if (!this.$el) {
      this.$el = document.createElement("p");
      this.$el.className = this.className;
    }
    this.$el.textContent = this.text;
    this.$parent.append(this.$el);
  }

  setState(text) {
    this.text = text;
    this.render();
  }

  hide() {
    this.$el.classList.add("hide");
  }
  show() {
    this.$el.classList.remove("hide");
  }
}
