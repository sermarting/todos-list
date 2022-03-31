<template>
  <div class="todoapp">
    <h1>todos</h1>
    <div>
      <input
        id="todoInput"
        class="new-todo"
        autofocus
        type="text"
        placeholder="what needs to be done?"
        v-model="newItem"
        v-on:keydown.enter.prevent="addToTodoList"/>
    </div>
    <div class="main" v-bind:class="{'hidden': this.isTodoListFilteredEmpty}">
      <span
        class="toggle-all"
        v-bind:class="{'checked': this.isTodoCompleted}"></span>
      <label for="todoInput" @click="toggleAll">
      </label>
      <TodoList
        :todo-list="todoListFromStore"
        @toggle-item="editTodo"
        @edit-item="editTodo"
        @delete-item="deleteTodo" />
    </div>
    <div class="footer" v-bind:class="{'hidden': this.isTodoListFilteredEmpty}">
      <span class="todo-count" v-html="restantTodoList"></span>
      <ul class="filters">
        <li><a @click="goTo('/')">All</a></li>
        <li><a @click="goTo('active')">Active</a></li>
        <li><a @click="goTo('completed')">Completed</a></li>
      </ul>
      <span class="clear-completed" @click="clearCompleted">Clear completed</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from '@/components/TodoList.vue';
import TodoItem from '@/models/TodoItem';

@Component({
  components: {
    TodoList,
  },
})
export default class MainView extends Vue {
  newItem = '';

  get todoListFromStore(): Array<TodoItem> {
    if (this.$route.name === 'completed') {
      return this.$store.getters.todosCompleted;
    }
    if (this.$route.name === 'active') {
      return this.$store.getters.todosActive;
    }
    return this.$store.state.todosList;
  }

  get isTodoListFilteredEmpty() {
    return this.todoListFromStore.length === 0;
  }

  get isTodoCompleted() {
    return this.$store.getters.isTodosCompleted;
  }

  get restantTodoList() {
    const restant = this.todoListFromStore.length
    - this.todoListFromStore.filter((todo) => todo.completed).length;
    return `<strong>${restant}</strong> item${this.todoListFromStore.length > 1 ? 's' : ''} left`;
  }

  addToTodoList() {
    if (this.newItem) {
      this.$store.dispatch('newTodo', new TodoItem(
        this.$store.state.todosList.length + 1,
        this.newItem.trim(),
      ));
      this.newItem = '';
    }
  }

  editTodo(item: TodoItem) {
    this.$store.dispatch('editTodo', item);
  }

  deleteTodo(item: TodoItem) {
    this.$store.dispatch('deleteTodo', item);
  }

  clearCompleted() {
    this.$store.dispatch('clearCompleted');
  }

  toggleAll() {
    this.$store.dispatch('toggleAll', !this.isTodoCompleted);
  }

  goTo(direction: string) {
    if (this.$route.name !== direction) {
      this.$router.push(direction);
    }
  }
}
</script>
<style scoped lang="scss">
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all.checked + label:before {
  color: #737373;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>
