import React, { useEffect, useState } from 'react'
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash, faEdit, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

function TodoList({ todo, setTodo }) {

    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [filtered, setFiltered] = useState(todo);

    useEffect( () => {
        setFiltered(todo)
    }, [todo])

    function todoFilter(status) {
        if (status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    function deleteTodo(id) {
        const newTodo = [...todo].filter(item => item.id !== id)
        setTodo(newTodo)
    };

    function statusTodo(id) {
        const newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    };

    function editTodo(id, title) {
        setEdit(id);
        setValue(title);
    };

    function saveTodo(id) {
        const newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item;
        }
        )
        setTodo(newTodo);
        setEdit(null);
    }

    return (
        <div >
            <button className={s.btn} onClick={() => todoFilter('all')}>Все</button>
            <button className={s.btn} onClick={() => todoFilter(true)}>Открытые</button>
            <button className={s.btn} onClick={() => todoFilter(false)}>Закрытые</button>
            {
                filtered.map(item => (
                    <div>
                        <div key={item.id} className={s.list}>
                            {
                                edit === item.id ?
                                    <div>
                                        <input className={s.input} value={value} onChange={(e) => setValue(e.target.value)} />
                                    </div> :
                                    <div className={!item.status ? s.close : ''}>
                                        {item.title}
                                    </div>
                            }

                            {
                                edit === item.id ?
                                    <div>
                                        <button className={s.btn} onClick={() => saveTodo(item.id)}><FontAwesomeIcon icon={faSave} /></button>
                                    </div> :
                                    <div className={s.btns}>
                                        <button className={s.btn} onClick={() => deleteTodo(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        <button className={s.btn} onClick={() => editTodo(item.id, item.title)}><FontAwesomeIcon icon={faEdit} /></button>
                                        <button className={s.btn} onClick={() => statusTodo(item.id)}>
                                            {
                                                item.status ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />
                                            }
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default TodoList
