import { useState } from "react";
import "./TODO.scss";
import "./TODO1.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TODO = () => {
  const [useStyle1, setUseStyle1] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const toggleStyle = () => {
    setUseStyle1((prevStyle) => !prevStyle);
  };
  const addTodo = () => {
    if (!todoInput) {
      return;
    }
    setTodos((prevTodos) => [
      { text: todoInput, date: new Date() },
      ...prevTodos,
    ]);
    setTodoInput("");
  };

  const deleteItem = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  return (
    <>
      <button
        className={useStyle1 ? "toggle-button" : "toggle-button-1"}
        onClick={toggleStyle}
      >
        Toggle Style
      </button>
      <div className={useStyle1 ? "todo-container" : "todo-container-1"}>
        <div className="new-todo-container">
          <label className="label">Add Item</label>
          <input
            placeholder="What's on your mind?"
            className="todo-input"
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <div className="add-todo-btn" onClick={addTodo}>
            ADD
          </div>
        </div>
        <div className="to-do-list-container">
          {todos.length > 0 && <label className="label">Item List</label>}
          {todos.map((todo, index) => (
            <div key={index} className="todo-item">
              <div className="todo-item-data">
                <div>{todo.text}</div>
                <div className="todo-item-date">
                  {todo.date.toLocaleString()}
                </div>
              </div>
              <div className="todo-buttons">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => deleteItem(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TODO;
