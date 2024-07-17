import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsFillTrashFill, BsFillCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'

function Todo() {

    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [id, setId] = useState('');
    const [eBox, setEBox] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err));
        console.log('effect');
    },[]);

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => location.reload())
        .catch(err => console.log(err));
        setTask('');
    }

    const handleCheck = (id, done) => {
        axios.put('http://localhost:3001/update', {
            params: {
                id: id,
                done: done
            }
        })
        .then(result => location.reload())
        .catch(err => console.log(err));
    }

    const handleEBox = (todo) => {
        setEBox(true);
        setTask(todo.task);
        setId(todo._id);
    }

    const handleEBoxClose = () => {
        setEBox(false);
        setTask('');
        setId('');
    }

    const handleEdit = () => {
        axios.put('http://localhost:3001/edit', {
            params: {
                id: id,
                task: task
            }
        })
        .then(result => location.reload())
        .catch(err => console.log(err));
        setEBox(false);
        setTask('');
        setId('');
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+ id)
        .then(result => location.reload())
        .catch(err => console.log(err));
    }

  return (
    <div className='todo'>
        <h1>To-do List</h1>
        <div className='input-box'>
            <input type='text' id='task' placeholder='Enter a task' 
            value={task} onChange={(e)=> setTask(e.target.value)}></input>
            <button onClick={handleAdd}>Add</button>
        </div>
        <div className='display-tasks'>
            {
                todos.length === 0 ?
                <h2>No Records!</h2>
                :
                todos.map((todo,i) => (
                    <div className='task' key={i}>
                        <span onClick={() => handleCheck(todo._id, todo.done)}>
                            {todo.done === false ? <BsFillCircleFill/>
                            : <BsCheckCircleFill/>}
                        </span>
                        <div className={todo.done === true ? 'line' : ''}>{todo.task}</div>
                        <span className='btn' onClick={() => handleEBox(todo)}><FaEdit/></span>
                        <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill/></span>
                    </div>
                ))
            }
        </div>
        {
            eBox && 
            <div className='edit-box'>
                <div className='edit-content'>
                    <span className='x-btn' onClick={handleEBoxClose}>&times;</span>
                    <h2>Edit Data</h2>
                    <div className='edit-input'>
                        <input type="text" value={task} onChange={(e)=> setTask(e.target.value)} autoFocus id="e-task"/>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Todo;