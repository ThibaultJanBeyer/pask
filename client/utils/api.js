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
    const method = "GET",
      settings = this.settings;
    settings.method = method;
    const response = await fetch(url, settings).catch(err => console.log(err));
    return await response.json();
  }

  async post(url, data) {
    const method = "POST",
      settings = this.settings;
    settings.method = method;
    const response = await fetch(url, this.settings).catch(err =>
      console.log(err)
    );
    return await response.json();
  }
}

export default new API();
