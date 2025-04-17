import "./App.css";
import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

import { PseudoAPI } from "./pseudoApi/pseudoApi";

const mockDate = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

// 서버 초기화
if (!localStorage.getItem("todo_items")) {
  localStorage.setItem("todo_items", JSON.stringify(mockDate));
}
console.log(
  "서버 초기화 완료!",
  JSON.parse(localStorage.getItem("todo_items"))
);

function App() {
  const [sholdRerender, setShouldRerender] = useState(0);
  const [todos, setTodos] = useState([]);
  const idRef = useRef(3);

  useEffect(() => {
    console.log("useEffect 실행");
    PseudoAPI.getAll().then((fetchedTodos) => {
      setTodos(fetchedTodos);
      idRef.current = fetchedTodos.length;
    });
  }, [sholdRerender]);

  const onCreate = async (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    await PseudoAPI.create(newTodo);
    setShouldRerender((prev) => prev + 1);
    console.log("rerender", sholdRerender);
  };

  // 아직 서버에 업데이트 기능이 없음
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDelete = (targetId) => {
    PseudoAPI.delete(targetId);
    setShouldRerender((prev) => prev + 1);
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
