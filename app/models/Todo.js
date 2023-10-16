import { generateId } from "../utils/GenerateId.js"

export class Todo {
    constructor(data) {
        this.id = data.id || generateId()
        this.description = data.description
        this.completed = data.completed

    }

    get createTodosTemplate() {
        return `
        <div class="col-6 d-flex mb-2">
        <input class="mx-2 tp-bg fs-5" ${this.completed ? 'checked' : ''} onchange="app.TodosController.completeTodo('${this.id}')" type="checkbox">
        <p class="fw-bold text-white px-2 tp-bg rounded-pill">${this.description}</p>
        <i role="button" onclick="app.TodosController.removeTodo('${this.id}')" class="mdi mdi-delete text-white mx-3 tp-bg rounded-pill"></i>
      </div>
`
    }
}