import React, { useState } from 'react'
import s from './AddTodo.module.css'

function AddTodo({ todo, setTodo }) {

    const [value, setValue] = useState('');

    function saveTodo() {
        if (value) {
            setTodo(
                [...todo, {
                    id: new Date(),
                    title: value,
                    status: true
                }]
            )
            setValue('')
        }
    }

    return (
        <div className={s.addTodo}>
            <input 
            className={s.input} 
            placeholder='Введите задачу' 
            value={value} onChange={(e) => setValue(e.target.value)}
            onKeyPress = {e => e.key === 'Enter' && saveTodo(value)} />
            <button className={s.btn} onClick={saveTodo}>Сохранить</button>
        </div>
    )
}

export default AddTodo
