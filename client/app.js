import * as baseComponents from "./baseComponents";
import * as minorComponents from "./minorComponents";
import * as utils from "./utils";
import Engine from "./engine";

const components = {
  utils,
  baseComponents,
  minorComponents
}


Engine.registerComponents(components);
