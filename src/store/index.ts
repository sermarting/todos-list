import Vue from 'vue';
import Vuex from 'vuex';
import TodoItem from '../models/TodoItem';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todosList: Array<TodoItem>(),
  },
  getters: {
    todosCompleted(state) {
      return state.todosList.filter((todo: TodoItem) => todo.completed);
    },
    todosActive(state) {
      return state.todosList.filter((todo: TodoItem) => !todo.completed);
    },
    isTodosCompleted(state) {
      return state.todosList.filter((todo: TodoItem) => todo.completed).length
        === state.todosList.length;
    },
  },
  mutations: {
    newTodo(state, todoItem: TodoItem) {
      state.todosList.push(todoItem);
    },
    editTodo(state, todoItem: TodoItem) {
      const todos = state.todosList;
      const elemIndex = todos.findIndex((todo) => todo.id === todoItem.id);
      todos.splice(elemIndex, 1);
      todos.splice(elemIndex, 0, todoItem);
      state.todosList = todos;
    },
    deleteTodo(state, todoItem: TodoItem) {
      const todos = state.todosList;
      todos.splice(todos.findIndex((todo) => todo.id === todoItem.id), 1);
      state.todosList = todos;
    },
    clearCompleted(state) {
      const todos = state.todosList;
      state.todosList = todos.filter((todo) => !todo.completed);
    },
    toggleAll(state, check: boolean) {
      const todos = state.todosList;
      state.todosList = todos.map((todo) => ({ ...todo, completed: check }));
    },
  },
  actions: {
    newTodo(context, todoItem: TodoItem) {
      context.commit('newTodo', todoItem);
    },
    editTodo(context, todoItem: TodoItem) {
      context.commit('editTodo', todoItem);
    },
    deleteTodo(context, todoItem: TodoItem) {
      context.commit('deleteTodo', todoItem);
    },
    clearCompleted(context) {
      context.commit('clearCompleted');
    },
    toggleAll(context, check: boolean) {
      context.commit('toggleAll', check);
    },
  },
  modules: {
  },
});
