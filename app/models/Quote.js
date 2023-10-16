export class Quote {
    constructor(data) {
        this.content = data.content
        this.author = data.author
    }

    get quotesTemplate() {
        return `
        <div class="col-6 tp-bg text-white text-center rounded-pill fw-bold p-3">
        <p>${this.content}</p>
        <p>${this.author}</p>
      </div>
`
    }
}