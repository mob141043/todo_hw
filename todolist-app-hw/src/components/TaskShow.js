import React from 'react';
import clsx from "clsx";

const TaskShow = (props) => {
    const {taskItems} = props;

    const handleTickTask = (id, isCompleted) => {
        const {onTickTask} = props;
        onTickTask(id, isCompleted);
    };

    const handleRemoveTask = (id) => {
        const { onRemoveTask } = props;
        if (window.confirm("Are you sure about this ?")) {
            onRemoveTask(id);
        }
    };

    return (
        <div className="todo__content">
            {taskItems.map(({id, name, isCompleted}) => (
                <div
                    className={clsx("todo--item", isCompleted && "completed")}
                    key={id}>
            <span>
              <input
                  type="checkbox"
                  defaultChecked={isCompleted}
                  onClick={() => handleTickTask(id, !isCompleted)}
              />
            </span>
                    <span>{name}</span>
                    <span className="remove" onClick={() => handleRemoveTask(id)}>
              &times;
            </span>
                </div>
            ))}
        </div>
    );
}

export default TaskShow;