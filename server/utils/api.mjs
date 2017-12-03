import fetch from "node-fetch";

class API {
  constructor() {
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  async get(url) {
    const method = "GET",
      response = await fetch(url, {
        method: method,
        headers: this.headers
      }).catch(err => console.log(err));
      return await response.json();
  }

  async post(data) {
    const method = "POST";
    response = await fetch(url, {
      method: method,
      headers: this.headers
    }).catch(err => console.log(err));
    return await response.json();
  }
}

export default new API();
