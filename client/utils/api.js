const urls = {
  tracker: "http://localhost:8080/api/tracker",
  saveTracker: "/save"
};

class API {
  constructor() {
    this.url = "http://localhost:8080/api/";
    this.settings = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "default"
    };
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  async get(url) {
    let method = "GET",
      settings = this.settings;
    settings.method = method;
    let response = await fetch(url, settings).catch(err => console.log(err));
    return await response.json();
  }

  async post(url, data) {
    let method = "POST",
      settings = this.settings;
      settings.method = method;
      settings.body = JSON.stringify(data);
      console.log(data);
    let response = await fetch(url, this.settings).catch(err =>
      console.log(err)
    );

    return await response.json();
  }

  async saveTracker(data) {
    let url = urls.tracker + urls.saveTracker;
    let response = await this.post(url, data);
    console.log(response);
  }
}

export default new API();
