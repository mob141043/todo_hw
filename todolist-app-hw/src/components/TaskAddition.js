import React, {useState} from 'react';

const TaskAddition = (props) => {

    const [taskName, setTaskName] = useState("");
    const handleAddItem = (e) => {
        e.preventDefault();
        const {onAddTask} = props;
        if (taskName.trim() !== "") {
            const task = {
                name: taskName,
                isCompleted: false,
            };
            onAddTask(task);
            setTaskName("");
        }
    };

    const handleChangeValue = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setTaskName(e.target.value);
    };

    return (
        <div>
            <form action="" onSubmit={handleAddItem}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={handleChangeValue}
                    />
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};


export default TaskAddition;