import "./Editor.css";
import { useState } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [type, setType] = useState("DEFAULT");

  const onSubmit = () => {
    if (content === "") return;
    onCreate(content, type);
    setContent("");
    setType("DEFAULT");
  };

  return (
    <div className="Editor">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="새로운 Todo..."
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="type-select"
      >
        <option value="DEFAULT">일반</option>
        <option value="URGENT">긴급</option>
        <option value="IMPORTANT">중요</option>
      </select>
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
