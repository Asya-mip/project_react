import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.css';

const TaskDescriptionPage = ({ data, updateTaskDescription }) => {
    const {taskId} = useParams();
    const [taskData, setTaskData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const foundTask = data.reduce((acc, section) => acc || section.tasks.find(task => String(task.id) === taskId), undefined);
        console.log('foundTask:', foundTask);
        if(foundTask) {
            console.log('Current taskId:', taskId);
            setTaskData(foundTask);
            setDescription(foundTask.description || '');
        }
    }, [data, taskId]);

    const saveDescription = () => {
        updateTaskDescription(taskId, description); 
        setEditMode(false);
    };

    return (
        <div className={styles["description-container"]}>
            <div className={styles["description-content"]}>
                <Link to="/" className={styles["back-btn"]}></Link>
                {Object.keys(taskData).length > 0 ? ( 
                    <>
                        <h2 className={styles["description-title"]}>{taskData.name}</h2>
                        {!editMode && (
                            <div>
                                {description !== '' ? (
                                    <p className={styles["description-text"]}>{description}</p>
                                ) : (
                                    <p className={styles["description-text"]}>This task has no description.</p>
                                )}
                            </div>
                        )}
                        {editMode && (
                            <>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={styles["description-edit"]}
                                /> 
                            </>
                        )}
                    </>
                ) : (
                    <p>Задача не найдена!</p>
                )}
        </div>

        <div className={styles["buttons-container"]}>
            {editMode ? (
                <button className={styles['save-btn']} onClick={saveDescription}>Save</button>
            ) : (
                <button className={styles['edit-btn']} onClick={() => setEditMode(true)}>Edit description</button>
            )}
        </div>
    </div>
    );
};

export default TaskDescriptionPage;