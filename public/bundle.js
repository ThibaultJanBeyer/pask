(function () {
'use strict';

class Engine {
  constructor() {
    this.drivers = new Map();
  }

  async registerUtils(utils) {
    for (const util of utils) {
      const container = await this.import(`/utils/${util}.js`);
      this.drivers.set(util, container);
    }
  }

  async reqisterComponents(components) {
    for (const component of components) {
      const container = await this.import(`/components/${util}.js`);
      customElements.define(component, container);
    }
  }

  async import(name) {
    const params = {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }),
      mode: "cors",
      cache: "default"
    };
    let url = `http://localhost:8080/public/client`;
    const response = await fetch(url + name, params);
    console.log(response);
  }
}

var Engine$1 = new Engine();

Engine$1.registerUtils(["api", "eventEmmitter"]);


console.log(Engine$1);

}());
