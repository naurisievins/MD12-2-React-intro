import { useState } from 'react'
import './App.css'

export default function App() {

  const [inputText, setInputText] = useState('');
  const [todoTasks, setTodoTask] = useState<TaskObject[]>([]);

  return (
    <div className="todo_container">
      <h1 className='todo_container__title'>TODO list</h1>
      <InputForm todoTasks = { todoTasks } 
                 setTodoTask = { setTodoTask }
                 setInputText = { setInputText }
                 inputText = { inputText }
      />
      <ListItems todoTasks = { todoTasks } 
                 setTodoTask = { setTodoTask }
      />
    </div>
  )
}

const InputForm = (props: { setInputText:React.Dispatch<React.SetStateAction<string>>,
                            todoTasks: TaskObject[],
                            setTodoTask: React.Dispatch<React.SetStateAction<TaskObject[]>>,
                            inputText: string }) => {

  const handleInput = (e) => {
    props.setInputText(e.target.value)
  }

  const hanndleAdd = (e) => {
    e.preventDefault()
    props.setTodoTask([...props.todoTasks, {id: props.todoTasks.length + 1, todo: props.inputText}])
    props.setInputText('');
  }

  return (
    <form className='todo_container__add-item'>
      <input value={props.inputText} onChange={handleInput}
             className='add-item__input' type='text' placeholder='Your task...'
      />
      <button onClick={hanndleAdd} className='add-item__btn'>Add</button>
    </form>
  )
}

type TaskObject = {
  id: number
  todo: string
}

const ListItems = (props: { todoTasks: TaskObject[],
                            setTodoTask: React.Dispatch<React.SetStateAction<TaskObject[]>>}) => {
  return (
  <div className="todo_container__list">
    <ul>
      {props.todoTasks.map((todoTask: TaskObject) => (
        <TodoItem todo = { todoTask.todo } 
                  id = { todoTask.id }
                  key = { todoTask.id }
                  todoObj = { todoTask }
                  todoTasks = { props.todoTasks }
                  setTodoTask = { props.setTodoTask }
        />
      ))}
    </ul>
  </div>
  )
}

const TodoItem = (props: { todo: string,
                           id: number,
                           todoObj: TaskObject,
                           setTodoTask: React.Dispatch<React.SetStateAction<TaskObject[]>>,
                           todoTasks: TaskObject[]}) => {

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked)
  }

  const handleDelete = () => {
    props.setTodoTask(props.todoTasks.filter((ele: TaskObject) => ele.id !== props.todoObj.id))
  }

  return (
    <li className="list__item">
      <hr />
      <input type='checkbox' onChange={handleCheck} />
      <span className="list__task" style={{ textDecoration: checked ? 'line-through' : 'none'  }}> {props.id}. {props.todo}</span>
      <span className='list__delete' onClick={handleDelete}> [x]</span>
    </li>
  )
  
}
