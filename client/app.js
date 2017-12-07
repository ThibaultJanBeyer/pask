import * as components from "./components";
import * as utils from "./utils";

import Engine from "./engine";

const container = {
  utils,
  components
};

Engine.register(container);



Engine.router
  .add("/", {
    enter: router => {
      Engine.render("body-el");
      console.log("home");
    }
  })
  .add("/new", {
    enter: () => {
      Engine.render("newtracker-el");
    }
  })
  .start({
    fallback: "/" // if the current URL matches no route, use this one
  });
