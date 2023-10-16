import { AppState } from "../AppState.js"
import { Todo } from "../models/Todo.js"
import { api } from "./AxiosService.js"

class TodosService {
    async completeTodo(todoId) {
        const todoIndex = AppState.todos.findIndex(todo => todo.id == todoId)
        if (todoIndex == -1) {
            return
        }
        const selectedTodo = AppState.todos.find(todo => todo.id == todoId)

        const todoData = {
            completed: !selectedTodo.completed

        }

        const res = await api.put(`api/todos/${todoId}`, todoData)

        const newTodo = new Todo(res.data)

        AppState.todos.splice(todoIndex, 1, newTodo)
        AppState.emit('todos')


        // console.log('completed?', res.data);
        // console.log('appstate complete?', AppState.todos);
    }
    async getTodos() {
        const res = await api.get('api/todos')
        // console.log('todos in api', res.data)
        AppState.todos = res.data.map((todoPojo) => new Todo(todoPojo))
    }
    async removeTodo(todoId) {
        const res = await api.delete(`api/todos/${todoId}`)
        // console.log('res data', res);
        AppState.todosCount--

        const todoIndex = AppState.todos.findIndex(todo => todo.id == todoId)
        if (todoIndex == -1) {
            return
        }
        AppState.todos.splice(todoIndex, 1)
        AppState.emit('todos')
    }

    async createTodo(todoData) {
        const res = await api.post('api/todos', todoData)
        console.log('Created todo in api', res)
        const newTodo = new Todo(res.data)
        AppState.todos.push(newTodo)
        AppState.emit('todos')
        console.log(AppState.todos)

    }

}

export const todosService = new TodosService()