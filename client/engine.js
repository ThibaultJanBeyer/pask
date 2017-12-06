import Router from "./router";

class Engine {
  constructor() {
    this.container = new Map();
    this.router = new Router(true);
  }

  registerComponents(items) {
    this.registerUtils(items["utils"]);
    this.registerComponents(items["components"]);
  }

  registerUtils(utils) {
    for (const key in utils) {
      this.container.set(key, utils[key]);
    }
  }

  registerComponents(components) {
    for (const key in components) {
      const name = `${key}-el`;
      customElements.define(name, components[key]);
    }
  }
}

export default new Engine();
