import { useState } from "react";
import "./Todo-dark.scss";
import "./Todo-light.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faPencil,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
  const [theme, setTheme] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const toggleTheme = () => {
    setTheme((prevStyle) => !prevStyle);
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
        isCompleted: false,
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
        className={theme ? "toggle-button-dark" : "toggle-button-light"}
        onClick={toggleTheme}
      >
        Toggle Style
      </button>
      <div className={theme ? "todo-container-dark" : "todo-container-light"}>
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
          <div className="todo-text-container">
            {todo.isCompleted ? (
              <FontAwesomeIcon
                className="fa-icon"
                icon={faSquareCheck}
                onClick={() =>
                  updateTodo({ ...todo, isCompleted: false }, index)
                }
              />
            ) : (
              <FontAwesomeIcon
                className="fa-icon"
                icon={faSquare}
                onClick={() =>
                  updateTodo({ ...todo, isCompleted: true }, index)
                }
              />
            )}
            <div className={todo.isCompleted ? "strikethrough" : ""}>
              {todo.text}
            </div>
          </div>
        )}
        <div className="todo-item-date">{todo.date.toLocaleString()}</div>
      </div>
      <div className="todo-buttons">
        {todo.editMode ? (
          <FontAwesomeIcon
            className="fa-icon"
            icon={faCheck}
            onClick={() => updateTodo({ ...todo, editMode: false }, index)}
          />
        ) : (
          <FontAwesomeIcon
            className="fa-icon"
            icon={faPencil}
            onClick={() => editTodo(index)}
          />
        )}

        <FontAwesomeIcon
          className="fa-icon"
          icon={faTrashCan}
          onClick={() => deleteTodo(index)}
        />
      </div>
    </div>
  );
};

export default Todo;
