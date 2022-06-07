import axios from "axios";
import { useState } from "react";
import './Todo.scss'

export default function Todo(props) {
    const { string, getTodos } = props;
    const [checked, setChecked] = useState(false);

    if (checked) {
        axios.post(`http://localhost:4000/api/todos?remove=${string}`);
        setChecked(false);
        getTodos();
    }

    return (
        <div className='Todo'>
            {string}
            <form>
                <input
                    type='checkbox'
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </form>
        </div>
    )
};