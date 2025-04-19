import "./App.css";
import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { PseudoAPI } from "./pseudoApi/pseudoApi";
import { todoObserver } from "./observers/TodoObserver";

const mockDate = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime()
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime()
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime()
  }
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

  useEffect(() => {
    const handleCheckAll = (isChecked) => {
      const updatedTodos = todos.map(todo => ({ ...todo, isDone: isChecked }));
      setTodos(updatedTodos);
      // 각 todo 항목의 상태를 서버에 저장
      updatedTodos.forEach(todo => {
        PseudoAPI.update(todo.id, { ...todo, isDone: isChecked });
      });
      setShouldRerender((prev) => prev + 1);
    };

    todoObserver.subscribe(handleCheckAll);
    return () => todoObserver.unsubscribe(handleCheckAll);
  }, [todos]);

  const onCreate = async (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime()
    };

    await PseudoAPI.create(newTodo);
    setShouldRerender((prev) => prev + 1);
    console.log("rerender", sholdRerender);
  };

  const onUpdate = async (targetId) => {
    const updatedTodo = todos.find(todo => todo.id === targetId);
    if (updatedTodo) {
      const newTodo = { ...updatedTodo, isDone: !updatedTodo.isDone };
      await PseudoAPI.update(targetId, newTodo);
      setTodos(todos.map(todo => 
        todo.id === targetId ? newTodo : todo
      ));
      setShouldRerender((prev) => prev + 1);
    }
  };

  const onDelete = (targetId) => {
    PseudoAPI.delete(targetId);
    setShouldRerender((prev) => prev + 1);
  };

  const onDeleteAll = () => {
    todos.forEach(todo => PseudoAPI.delete(todo.id));
    setShouldRerender((prev) => prev + 1);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
}

export default App;
