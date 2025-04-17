class TodoStore {
  static instance = null;
  observers = [];
  todos = [];

  constructor() {
    // 싱글톤
    if (TodoStore.instance) {
      return TodoStore.instance;
    }
    TodoStore.instance = this;
  }

  static getInstance() {
    if (!TodoStore.instance) {
      TodoStore.instance = new TodoStore();
    }
    return TodoStore.instance;
  }

  subscribe(observer) {
    // 옵저버
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer(this.todos));
  }

  setTodos(todos) {
    this.todos = todos;
    this.notify();
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo) {
    this.todos = [todo, ...this.todos];
    this.notify();
  }

  updateTodo(targetId) {
    this.todos = this.todos.map((todo) =>
      todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
    );
    this.notify();
  }

  deleteTodo(targetId) {
    this.todos = this.todos.filter((todo) => todo.id !== targetId);
    this.notify();
  }
}

export default TodoStore;
