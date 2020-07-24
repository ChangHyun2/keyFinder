import { Component } from "./Component";

export class Tooltip extends Component {
  constructor(config) {
    const { $parent, classes = "tooltip", text = "" } = config;
    super("p", { $parent, classes });

    this.text = text;
    this.render();
  }

  render() {
    this.$el.textContent = this.text;
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
