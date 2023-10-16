import { AppState } from "../AppState.js";
import { Todo } from "../models/Todo.js";
import { api } from "../services/AxiosService.js";
import { todosService } from "../services/TodosService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

function _drawTodoCount() {
    const todos = AppState.todos.filter(todo => todo.completed == false)
    // console.log('todos draw', todos)
    let todoCount = todos.length
    setText('todoCount', todoCount)
    AppState.emit('todoCount')
}
function _drawTodos() {
    let content = ''
    const todos = AppState.todos
    todos.forEach(todo => content += todo.createTodosTemplate)

    setHTML('todos', content)
}

export class TodosController {
    constructor() {

        console.log('todos controller loaded');

        AppState.on('account', this.getTodos)

        AppState.on('todos', _drawTodos)


        AppState.on('todosCount', _drawTodoCount)



    }

    async createTodo(event) {
        try {
            event.preventDefault()
            // console.log('form submitted');
            const form = event.target
            const todoFormData = getFormData(form)
            // console.log(todoFormData)
            await todosService.createTodo(todoFormData)
            form.reset()
            AppState.todosCount++
            _drawTodoCount()

        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

    async getTodos() {
        try {
            await todosService.getTodos()

            _drawTodoCount()

            AppState.emit('todos')

            // console.log('appstate', AppState.todos);

        } catch (error) {
            Pop.error(error)
            console.error(error);


        }

    }

    async removeTodo(todoId) {
        try {
            const yes = await Pop.confirm('are you sure you want to delete todo?')
            if (!yes) {
                return
            }
            await todosService.removeTodo(todoId)

            _drawTodoCount()
        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

    async completeTodo(todoId) {
        try {
            console.log('complete', todoId);
            await todosService.completeTodo(todoId)
            _drawTodoCount()


        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

}