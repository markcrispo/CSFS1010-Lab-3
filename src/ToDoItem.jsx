/* eslint-disable  react/prop-types */
import { useState, useRef, useEffect } from "react";

import styles from "./ToDoItem.module.css";

const ToDoItem = ({
  title,
  setTitle,
  isChecked,
  setIsChecked,
  handleRemove,
}) => {
  const [isEditing, setIsEditing] = useState(title === "");
  const [isHovering, setIsHovering] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(title);

  const enabled = workingTitle.length > 0;

  const inputRef = useRef();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      // inputRef.current.value = title;
    }
  }, [isEditing, title]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={styles.container}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      {isEditing ? (
        <input
          type="text"
          value={workingTitle}
          onChange={(event) => setWorkingTitle(event.target.value)}
          ref={inputRef}
        />
      ) : (
        <div>{title}</div>
      )}

      {(isHovering || isEditing) && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              if (isEditing) {
                // setTitle(inputRef.current.value);
                setTitle(workingTitle);
              }
              setIsEditing(!isEditing);
            }}
            disabled={!enabled}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
