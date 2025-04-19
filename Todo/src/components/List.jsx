import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { todoObserver } from "../observers/TodoObserver";

const List = ({ todos, onUpdate, onDelete, onDeleteAll }) => {
  const [search, setSearch] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);

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

  const onClickDeleteButton = () => {
    onDeleteAll();
  };

  const onChangeAllCheckbox = (e) => {
    const isChecked = e.target.checked;
    setIsAllChecked(isChecked);
    todoObserver.notify(isChecked);
  };

  return (
    <div className="List">
      <h4>Todo List🌱</h4>
      <div className="InnerList">
        <input
          type="checkbox"
          checked={isAllChecked}
          onChange={onChangeAllCheckbox}
        />
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onClickDeleteButton}>전체 삭제</button>
      </div>
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
