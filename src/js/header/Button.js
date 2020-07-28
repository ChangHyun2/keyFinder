import { Component } from "../common/Component";

export class Button extends Component {
  constructor(config) {
    const { $parent, $classes, text } = config;
    super("button", { $parent, $classes });
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
}
