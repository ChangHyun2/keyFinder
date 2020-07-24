export class Component {
  constructor(tag, config, shouldRender = true) {
    this.$el = document.createElement(tag);
    const { $parent, classes, attributes, position } = config;

    this.setConfig(classes, attributes);

    if (shouldRender) this.setPosition($parent, position);
  }

  setConfig(classes, attributes) {
    if (typeof classes === "string") {
      console.log(classes);
      this.$el.className = classes;
    }

    if (attributes && attributes.length > 0) {
      attributes.forEach(({ name, value }) =>
        this.$el.setAttribute(name, value)
      );
    }
  }

  setPosition($parent, position) {
    position
      ? $parent.insertAdjacentElement(position, this.$el)
      : $parent.append(this.$el);
  }
}
