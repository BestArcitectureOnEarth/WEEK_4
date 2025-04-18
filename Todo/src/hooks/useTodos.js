import { useState, useRef, useEffect, useCallback } from "react";
import { PseudoAPI } from "../pseudoApi/pseudoApi";

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

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(3);

  const fetchTodos = useCallback(async () => {
    const fetchedTodos = await PseudoAPI.getAll();
    setTodos(fetchedTodos);
    const maxId = fetchedTodos.reduce((max, todo) => Math.max(max, todo.id), 0);
    idRef.current = maxId + 1;
  }, []);

  useEffect(() => {
    // 서버 초기화
    if (!localStorage.getItem("todo_items")) {
      localStorage.setItem("todo_items", JSON.stringify(mockDate));
    }
    console.log(
      "서버 초기화 완료!",
      JSON.parse(localStorage.getItem("todo_items"))
    );
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = useCallback(async (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    await PseudoAPI.create(newTodo);
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = useCallback((targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = useCallback(async (targetId) => {
    await PseudoAPI.delete(targetId);
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    todos,
    onCreate,
    onUpdate,
    onDelete,
  };
}
