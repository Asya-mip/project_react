import './App.css';
import Header from './Components/content/Header/index';
import KanbanBoard from './Components/content/contents/index';
import { useState } from 'react';
import Footer from './Components/content/Footer/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskDescriptionPage from './Components/content/description/taskDescriptionPage';

const initialKanbanData = [
  {
    title: 'Backlog', 
    tasks: []
  },

    {
    title: 'Ready', 
    tasks: []
  },

  {
    title: 'In progress', 
    tasks: []
  },

  {
    title: 'Finished', 
    tasks: []
  }
];

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('kanbanData');
    return savedData ? JSON.parse(savedData) : initialKanbanData;
  });

  const addTaskToSection = (sectionTitle, newTaskName) => {
    const updateData = [...data];
    const sectionIndex = updateData.findIndex(section => section.title === sectionTitle);

    if (sectionIndex >= 0){
      const uniqID = Date.now().toString();
      updateData[sectionIndex].tasks.push(
        {
          id: uniqID,
          name: newTaskName,
          description: ''
        }
      );
      localStorage.setItem('kanbanData', JSON.stringify(updateData));
      setData(updateData);
    }
  }

  const moveTaskBetweenSections = (task, destinationTitle) => {
    const updateData = [...data];

    const sourceIndex = updateData.findIndex(section => section.tasks.some(t => t.id === task.id));
    const destIndex = updateData.findIndex(section => section.title === destinationTitle);

    if (sourceIndex >= 0 && destIndex >= 0){
      updateData[sourceIndex].tasks = updateData[sourceIndex].tasks.filter(t => t.id !== task.id);

      updateData[destIndex].tasks.push(task);


      localStorage.setItem('kanbanData', JSON.stringify(updateData));
      setData(updateData);
    }
  }

  const updateTaskDescription = (taskId, newDescription) => {
    const updatedData = data.map(section =>
      ({
        ...section,
        tasks: section.tasks.map(task =>
          task.id === taskId ? {...task, description: newDescription} : task
        ),
      })
    );
    
    localStorage.setItem('kanbanData', JSON.stringify(updatedData));
    setData(updatedData);
  };

  return (
     <BrowserRouter>
      <div className="page-container">
        <Header />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<KanbanBoard data={data} addTaskToSection={addTaskToSection} moveTaskBetweenSections={moveTaskBetweenSections} />} />
            <Route path="/tasks/:taskId" element={<TaskDescriptionPage data={data} updateTaskDescription={updateTaskDescription}/>} />
          </Routes>
        </main>
        <Footer data={data}/>
      </div>
    </BrowserRouter>
  
  );
};

export default App;
