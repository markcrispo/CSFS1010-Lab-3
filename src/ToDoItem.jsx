/* eslint-disable  react/prop-types */
import { useState } from "react";

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

  const enabled = title.length > 0;

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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      ) : (
        <div>{title}</div>
      )}

      {(isHovering || isEditing) && (
        <div className={styles.buttonContainer}>
          <button onClick={() => setIsEditing(!isEditing)} disabled={!enabled}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
