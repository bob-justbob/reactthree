import { useState, useRef, useEffect } from 'react';

const _todoItem = [
    {id: 1, text: 'text1', completed: true},
    {id: 2, text: 'text2', completed: false},
    {id: 3, text: 'text3', completed: true},
    {id: 4, text: 'text4', completed: false},

]

export default function TodoApp() {

    const [value, setValue] = useState('')
    const [todoItems, setTodoItems] = useState(_todoItem)
    const inputRef = useRef();

    function addNew(e){
        e.preventDefault();
        let newItem = {
            id: Date.now(),
            text: value,
            completed: false
        }
        setTodoItems([ newItem, ...todoItems])
        setValue('');
        

    
    }


    function changeItem(id){
        let changedItems = todoItems.map(item => {
            if (item.id === id){
                item.completed = !item.completed
            }
            return item;
        });
        setTodoItems(changedItems);
    }

    

    useEffect(()=>{
        inputRef.current.focus();
    }, []);

    function bye(id) {
        let byeBye = todoItems.filter(item => item.id !== id)
        setTodoItems(byeBye)
    }

    return (
        <div className="TodoApp">
            <h3>ToDo Aoo</h3>
            <form onSubmit={addNew}>
                <input  ref={inputRef} type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
                <button type="submit" >Add</button>
            </form>
            <ul>
                {
                     todoItems.map(item =>{
                        return (
                            <li ket={item.id}>
                                <input 
                               
                                type="checkbox" 
                                checked={item.completed}
                                onChange={()=> changeItem(item.id)}

                                />
                                <span className={item.completed ? 'completed': '' }>{item.text}</span>
                                <button onClick={()=> bye(item.id)} >Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}