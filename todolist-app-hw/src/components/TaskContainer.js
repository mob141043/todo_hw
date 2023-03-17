import React, {useEffect, useState} from 'react';
import {BASE_API_URL} from "../constants/Endpoint";
import TaskShow from "./TaskShow";
import "./Todo.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskAddition from "./TaskAddition";
import TaskSearch from "./TaskSearch";

const TaskContainer = () => {

    const [taskItems, setTaskItems] = useState([]);

    const fetchAllTasks = async () => {
        const res = await fetch(BASE_API_URL);
        return res.json();
    };

    useEffect(() => {
        fetchAllTasks().then((taskItems) => {
            setTaskItems(taskItems);
        });
    }, []);

    const handleTickTask = async (id, isCompleted) => {
        const response = await fetch(`${BASE_API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isCompleted: isCompleted}),
        });

        if (response.ok) {
            const index = taskItems.findIndex((task) => task.id === id);
            const newTaskItems = [...taskItems];
            newTaskItems[index].isCompleted = isCompleted;
            setTaskItems(newTaskItems);
        }
    }

    const handleAddTask = async (task) => {
        const response = await fetch(BASE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            const data = await response.json();
            setTaskItems(taskItems.concat(data));
        }
    };

    const handleRemoveTask = async (id) => {
        const response = await fetch(`${BASE_API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const newTaskItems = taskItems.filter(
                (task) => task.id !== id
            );
            setTaskItems(newTaskItems);
        }
    };

    const handleSearchTask = async (keyword) => {
        const response = await fetch(`${BASE_API_URL}?q=${keyword}`);

        if (response.ok) {
            const result = await response.json();
            setTaskItems(result);
        }
    };

    return (<div className="container">
            <div className="row justify-content-center">
                <div className="col-7">
                    <div className="todo">
                        <h2 className="text-center">Todo App</h2>
                        <TaskSearch onSearchTask={handleSearchTask}/>
                        <br></br>
                        <TaskShow taskItems={taskItems} onTickTask={handleTickTask} onRemoveTask={handleRemoveTask}/>
                        <TaskAddition onAddTask={handleAddTask}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TaskContainer;