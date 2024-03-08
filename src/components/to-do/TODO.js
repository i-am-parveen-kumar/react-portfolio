import { useState } from "react";
import "./TODO-dark.scss";
import "./TODO-light.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const TODO = () => {
  const [useStyle1, setUseStyle1] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const toggleStyle = () => {
    setUseStyle1((prevStyle) => !prevStyle);
  };

  const addTodo = () => {
    if (!todoInput) {
      return;
    }
    setTodos((prevTodos) => [
      {
        text: todoInput,
        date: new Date(),
        description: todoDescription,
        completed: false,
        editMode: false,
      },
      ...prevTodos,
    ]);
    setTodoInput("");
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const updateTodo = (updatedTodo, index) => {
    todos[index] = updatedTodo;
    setTodos([...todos]);
  };

  const editTodo = (index) => {
    const selectedTodo = todos[index];
    selectedTodo.editMode = true;
    todos[index] = selectedTodo;
    setTodos([...todos]);
  };
  const moveTodo = (fromIndex, toIndex) => {
    const newTodos = [...todos];
    const [removedTodo] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, removedTodo);
    setTodos(newTodos);
  };
  return (
    <>
      <button
        className={useStyle1 ? "toggle-button-dark" : "toggle-button-light"}
        onClick={toggleStyle}
      >
        Toggle Style
      </button>
      <div
        className={useStyle1 ? "todo-container-dark" : "todo-container-light"}
      >
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
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              moveTodo={moveTodo}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const TodoItem = ({
  todo,
  index,
  updateTodo = () => {},
  deleteTodo = () => {},
  editTodo = () => {},
  moveTodo = () => {},
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("index", index);
  };
  return (
    <div
      className="todo-item"
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const fromIndex = e.dataTransfer.getData("index");
        moveTodo(parseInt(fromIndex), index);
      }}
    >
      <div className="todo-item-data">
        {todo.editMode ? (
          <input
            className="todo-item-input"
            type="text"
            value={todo.text}
            onChange={(e) => {
              todo.text = e.target.value;
              updateTodo(todo, index);
            }}
          />
        ) : (
          <div>{todo.text}</div>
        )}
        <div className="todo-item-date">{todo.date.toLocaleString()}</div>
      </div>
      <div className="todo-buttons">
        {todo.editMode ? (
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => updateTodo({ ...todo, editMode: false }, index)}
          />
        ) : (
          <FontAwesomeIcon icon={faPencil} onClick={() => editTodo(index)} />
        )}

        <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteTodo(index)} />
      </div>
    </div>
  );
};

export default TODO;
