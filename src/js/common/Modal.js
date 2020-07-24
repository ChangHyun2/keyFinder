import { Component } from "./Component";
import setTimer from "../utility/setTimer";

export class Modal extends Component {
  constructor(config) {
    const { $parent = document.body, classes = "modal", contentHTML } = config;

    super("div", { $parent, classes, position: "afterbegin" });

    this.isOn = true;
    this.contentHTML = contentHTML;

    this.render();
  }

  async render() {
    if (this.isOn) {
      this.$el.innerHTML = this.contentHTML;
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
