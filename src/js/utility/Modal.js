import setTimer from "./setTimer";

export class Modal {
  constructor($parent = document.body, className, contentHTML) {
    this.$parent = $parent;
    this.className = className;
    this.isOn = true;
    this.contentHTML = contentHTML;
    this.render();
  }

  async render() {
    if (this.isOn) {
      if (!this.$el) {
        this.$el = document.createElement("div");
        this.$el.className = this.className;
      }
      this.$el.innerHTML = this.contentHTML;
      document.body.insertAdjacentElement("afterbegin", this.$el);
    } else {
      this.$el.classList.add("modal--fade");
      await setTimer(1000);
      this.$el.classList.add("hide");
    }
  }

  setState(isOn, contentHTML) {
    if (contentHTML) {
      this.contentHTML = contentHTML;
    }
    this.isOn = isOn;
    this.render();
  }
}
