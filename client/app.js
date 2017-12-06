import * as components from "./components";
import * as utils from "./utils";
import Engine from "./engine";

const container = {
  utils,
  components
};

Engine.registerComponents(components);
Engine.router.navigate("/new")


setTimeout(() => {
  Engine.router.navigate("/old")
}, 1000)