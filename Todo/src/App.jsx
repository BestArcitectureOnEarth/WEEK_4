import "./App.css";
import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

import { PseudoAPI } from "./pseudoApi/pseudoApi";
import { TodoFactory } from "./utils/TOdoFactory";
import { TodoCommands } from "./command/todoCommand";

const mockDate = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  { id: 1, isDone: false, content: "빨래하기", date: new Date().getTime() },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

if (!localStorage.getItem("todo_items")) {
  localStorage.setItem("todo_items", JSON.stringify(mockDate));
  console.log(
    "서버 초기화 완료!",
    JSON.parse(localStorage.getItem("todo_items"))
  );
}

function App() {
  const [sholdRerender, setShouldRerender] = useState(0);
  const [todos, setTodos] = useState([]);

  // 커맨드 패턴
  const todoCommands = TodoCommands(PseudoAPI, setShouldRerender);

  useEffect(() => {
    PseudoAPI.getAll().then((fetchedTodos) => {
      setTodos(fetchedTodos);
      TodoFactory.reset(fetchedTodos.length); // 생성 책임 분리=>단일 책임 원칙
    });
  }, [sholdRerender]);

  // 커맨드 패턴 + 팩토리 패턴
  const onCreate = async (content) => {
    const newTodo = TodoFactory.create(content); // 객체 생성 책임 분리
    await todoCommands.create(newTodo); // 커맨드
  };

  /*
  const onCreate = async (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content,
      date: new Date().getTime(),
    };

    await PseudoAPI.create(newTodo);
    setShouldRerender((prev) => prev + 1);
  };
  */

  //  커맨드 패턴
  const onDelete = (id) => {
    todoCommands.delete(id); // 명령 호출
  };

  /*
  const onDelete = (targetId) => {
    PseudoAPI.delete(targetId);
    setShouldRerender((prev) => prev + 1);
  };
  */

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
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
