import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import TodoStore from "./store/TodoStore";
import TodoFactory from "./factory/TodoFactory";

function App() {
  const [todos, setTodos] = useState(TodoFactory.createInitialTodos());
  const todoStore = TodoStore.getInstance();

  useEffect(() => {
    // 초기 데이터 설정
    todoStore.setTodos(todos);

    // App의 setTodos 함수를 관찰자로 등록
    todoStore.subscribe(setTodos);

    return () => {
      todoStore.unsubscribe(setTodos);
    };
  }, []);

  const onCreate = (content, type = "DEFAULT") => {
    const newTodo = TodoFactory.create(type, content);
    todoStore.addTodo(newTodo);
  };

  const onUpdate = (targetId) => {
    todoStore.updateTodo(targetId);
  };

  const onDelete = (targetId) => {
    todoStore.deleteTodo(targetId);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
