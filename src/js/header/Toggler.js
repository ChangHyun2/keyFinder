import { Button } from "./Button";

export class Toggler extends Button {
  constructor($target, options, buttonConfig) {
    super(buttonConfig); // {$parent, classes, text}
    this.$target = $target;
    this.options = options; // {toggleState, toggleClasses}
  }

  addToggleHandler(eventType, callback) {
    const { toggleState, toggleClasses } = this.options;

    this.$el.addEventListener(eventType, () => {
      if (toggleState) this.setTargetState(toggleState);
      if (toggleClasses) this.toggleTargetClasses(toggleClasses);
      callback();
    });
  }

  setTargetState(state) {
    this.$target.setState(state);
  }

  toggleTargetClasses(classes) {
    typeof classes === "string"
      ? this.$target.classList.toggle(classes)
      : classes.forEach((className) =>
          this.$target.classList.toggle(className)
        );
  }
}
