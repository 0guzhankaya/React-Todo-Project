import { ChangeEvent, FC } from 'react';
import './App.css';
import { useState } from 'react';
import { todoType } from './apptypes';
import TodoItem from './TodoItem';


// FC : Functional Component
const App: FC = () => {
  const [task, setTask] = useState<string>('');
  const [workDay, setWorkDay] = useState<number>(0);
  const [todoList, setTodoList] = useState<todoType[]>([]);

  console.log(todoList);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "task") {
      setTask(event.target.value);
    }
    else {
      setWorkDay(Number(event.target.value));
    }
    console.log(task, workDay);
  }

  const addNewTask = (): void => {
    const newTask = { taskName:task, workDay:workDay };
    setTodoList([...todoList, newTask]);
    setTask('');
    setWorkDay(0);
  }

  const deleteTask = (nameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== nameToDelete 
    }));
  };

  return (
    <div className="App">
      <div className='main-card'>
        <input className='main-card-input' type="text" onChange={handleChange} name="task" value={task} placeholder='Taskınızı Giriniz...' />
        <input className='main-card-input' type="number" onChange={handleChange} name="workDay" value={workDay} placeholder='Kaç günde tamamlamalısınız?' />
        <button className='main-card-button' onClick={addNewTask}>Yeni Task Ekle</button>
      </div>
      <div className='todo-card'>
        {todoList.map((task: todoType, index: number) => {
          return <TodoItem key={index} task={task} deleteTask={deleteTask} />;
        })}
      </div>
    </div>
  )
}

export default App
