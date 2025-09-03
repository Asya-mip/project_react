import styles from './styles.module.css';
import Column from './column';

const KanbanBoard = ({data, addTaskToSection, moveTaskBetweenSections}) => {
    return (
        <div className={styles['kanban-board']}>
           {
            data.map(
                (section, idx) => (
                    <Column key={idx} data={data} section={section} addTaskToSection={addTaskToSection} moveTaskBetweenSections={moveTaskBetweenSections} />
                )
            )
           }
        </div>
    );
};

export default KanbanBoard;