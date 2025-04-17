import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  const getTodoStyle = (todo) => {
    switch (todo.type) {
      case "URGENT":
        return {
          borderLeft: "4px solid red",
          backgroundColor: todo.isOverdue ? "#ffebee" : "white",
        };
      case "IMPORTANT":
        return {
          borderLeft: "4px solid orange",
          fontWeight: "bold",
        };
      default:
        return {
          borderLeft: "4px solid #ccc",
        };
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return "긴급";
      case 2:
        return "중요";
      case 3:
        return "일반";
      default:
        return "";
    }
  };

  const isOverdue = (todo) => {
    if (todo.type === "URGENT" && todo.deadline) {
      return new Date() > new Date(todo.deadline);
    }
    return false;
  };

  return (
    <div className="List">
      <h4>Todo List🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <div key={todo.id} className="TodoItem" style={getTodoStyle(todo)}>
              <div className="TodoContent">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => onUpdate(todo.id)}
                />
                <span className={todo.isDone ? "done" : ""}>
                  {todo.content}
                </span>
                {isOverdue(todo) && <span className="overdue">기한 임박!</span>}
              </div>
              <div className="TodoMeta">
                <span className="priority">
                  {getPriorityText(todo.priority)}
                </span>
                <button onClick={() => onDelete(todo.id)}>삭제</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
