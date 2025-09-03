import styles from './styles.module.css';
import {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Column = ({section, data, moveTaskBetweenSections, addTaskToSection}) => {
    const {title, tasks} = section;
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);

    const previousSection = getSourceSection(data, title); 
    const hasTasksInPreviousSection = previousSection?.tasks?.length > 0;

     const closeMenus = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsInputVisible(false);
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {  
        window.addEventListener('mousedown', closeMenus);
        return () => {
            window.removeEventListener('mousedown', closeMenus);
        };
    }, []);

    const handleClick = () => {
        if (title === "Backlog"){
            if (isInputVisible){
                submitNewTask();
            } else {
            setIsInputVisible(true);
            }
        } else {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const submitNewTask = () => {
        if (inputValue.trim().length > 0){
            addTaskToSection(title, inputValue);
            setInputValue("");
        }
        setIsInputVisible(false);
    };

    const selectTaskFromPreviousSection = (task) => {
        moveTaskBetweenSections(task, title);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles["column"]} ref={wrapperRef}>
            <h2>{title}</h2>
            <ul>
                {
                    tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task.id}><Link to={`/tasks/${task.id}`}>{task.name}</Link></li>
                        ))
                    ) : (
                        <p>Нет задач</p>
                    )
                }
            </ul>

            {title === "Backlog" ? (
            <>
            {
                isInputVisible && (
                    <li><input type="text" placeholder="" value={inputValue} onChange={(event) => setInputValue(event.target.value)} className={styles["input-field"]} /></li>
                ) 
            }
            <button className={`${styles["add-card"]} ${isInputVisible ? styles["submit"] : ""}`} onClick={handleClick}>
                <span className={styles["plus"]}>{isInputVisible ? "" : "+"}</span> 
                <span className={styles["card-text"]}>{isInputVisible ? "Submit" : "Add card"}</span>
            </button>
            </>
            ) : (
            <>
            <button disabled={!hasTasksInPreviousSection} className={`${styles["add-card"]} ${isDropdownOpen ? styles["dropdown-btn"] : ""}`} onClick={handleClick}>
                <span className={styles["plus"]}>{isDropdownOpen ? "" : "+"}</span> 
                <span className={styles["card-text"]}>{isDropdownOpen ? "" : "Add card"}</span>
            </button>

            {isDropdownOpen && (
                // <div className={styles['dropdown-menu']}>
                //     <ul>
                //     {getSourceSection(data, title)?.tasks?.map((task) => (
                //         <li key={task.id} onClick={() => selectTaskFromPreviousSection(task)}>
                //              {task.name}
                //         </li>
                //     ))}
                //     </ul>
                // </div>

                <div className={styles["dropdown-menu"]}>
                    <select className={styles["select"]} onChange={(event) => {
                        const selectedTaskId = event.target.value;
                        const task = getSourceSection(data, title)?.tasks.find(t => t.id === selectedTaskId);
                        if (task) {
                            selectTaskFromPreviousSection(task);
                        }
                    }}>
                    <option value=""></option>
                    {getSourceSection(data, title)?.tasks?.map((task) => (
                        
                        <option className={styles["option"]} key={task.id} value={task.id}>
                            {task.name}
                        </option>
                        
                    ))}
                    </select>
                </div>
        )}
        </>
        )}
        </div> 
    );
};

const getSourceSection = (data, targetTitle) => {
    if (!Array.isArray(data)) return null;
    const titlesOrder = ["Backlog", "Ready", "In progress", "Finished"];
    const currentIndex = titlesOrder.indexOf(targetTitle);
    if (currentIndex > 0){
        return data.find((section) => section.title === titlesOrder[currentIndex-1]);
    }
    return null;
};

export default Column;