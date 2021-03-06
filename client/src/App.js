import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Todo from './Components/Todo';
import './App.scss'

export default function App() {
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([]);

    const firstRenderRef = useRef(true);
    useEffect(() => {
        if (!firstRenderRef.current) {
            axios.post('http://localhost:3000/api/todos', {
                todos: todos
            })
        }
        firstRenderRef.current = false;
    }, [todos]);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const res = await axios.get('http://localhost:3000/api/todos');
        setTodos(res.data.todos);
    }

    const todoElements = todos.map((todo) => {
        return <Todo string={todo} getTodos={getTodos} key={todo} />
    });

    return (
        <div className='App'>
            <h1>Todos</h1>
            <form onSubmit={
                e => {
                    e.preventDefault();
                    if (!todos.includes(input) && input) {
                        setTodos([...todos, input]);
                    } else if (todos.includes(input)) {
                        alert('Todo already exists');
                    }
                    e.target.reset();
                    setInput('');
                }
            }>
                <input
                    type='text'
                    onChange={
                        e => setInput(e.target.value)
                    }
                />
                <button>Add</button>
            </form>
            {todoElements}
        </div>
    );
}