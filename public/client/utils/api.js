class API {
  constructor() {
    this.url = "http://localhost:8080/api/";
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

   async get(url) {
    const method = "GET",
      response = await fetch(this.url + url, {
        method: method,
        headers: this.headers
      }).catch(err => console.log(err));
      return await response.json();
  }

  async post(url, data) {
    const method = "POST";
    response = await fetch(this.url + url, {
      method: method,
      headers: this.headers,
      body:data
    }).catch(err => console.log(err));
    return await response.json();
  }
}

export default new API();
