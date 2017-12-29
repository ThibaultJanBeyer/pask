import * as components from "./components";
import * as utils from "./utils";

import Engine from "./engine";

const container = {
  utils,
  components
};

Engine.register(container);
Engine.render("notifier-el");

Engine.router
  .add("/", {
    enter: router => {
      Engine.renderPage("home-el");
    }
  })
  .add("/new", {
    enter: () => {
      Engine.renderPage("newtracker-el");
    }
  })
  .start({
    fallback: "/" // if the current URL matches no route, use this one
  });
