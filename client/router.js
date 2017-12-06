const TITLE_DEFAULT = "My Blog";

function sanitizePath(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export default class Router {
  constructor() {
    this.navigations = [];
  }

  track(navPath) {
    const referrer = document.referrer;
    this.navigations.push({ navPath, referrer });
    // temp for debugging Router
    console.log('navigations:', this.navigations); // eslint-disable-line
  }

  navigate(path = '', title = TITLE_DEFAULT) {
    const navPath = sanitizePath(path);
    this.track(navPath);
    document.title = title;
    if (history && navPath) {
       history.pushState(null, null, navPath); 
    }
  }
}