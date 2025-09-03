import styles from './styles.module.css';

const Footer = ({data}) => {
    const backlogIndex = data.findIndex(section => section.title === 'Backlog');
    const finishedIndex = data.findIndex(section => section.title === 'Finished');

    let numOfActiveTasks = 0;
    let numOfFinishedTasks = 0;

    if (backlogIndex !== -1 && finishedIndex !== -1){
        numOfActiveTasks = data[backlogIndex].tasks.length;
        numOfFinishedTasks = data[finishedIndex].tasks.length;
    }

    return(
        <footer>
            <div className={styles["footer-item"]}>
                <div className={styles["number-of-tasks"]}> 
                    <div className={styles["active-tasks"]}>Active tasks: {numOfActiveTasks}</div>
                    <div className={styles["finished-tasks"]}>Finished tasks: {numOfFinishedTasks}</div>
                </div>

                <div className={styles["text"]}>Kanban board by Anastasia, 2025</div>
            </div>
        </footer>
    )
  
}

export default Footer;