import React from 'react';

const TaskSearch = (props) => {

    const handleSearchTask = (taskName) => {
        const {onSearchTask} = props;
        onSearchTask(taskName);
    };

    return (
        <div>
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                onChange={(e) => handleSearchTask(e.target.value)}
            />
        </div>
    );
};

export default TaskSearch;