import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {FaPen} from 'react-icons/fa'

const Wordpair = ({pair, showEdit, setEditId, onDelete}) => {
    
    return (
        <div className='word'>
            <h3>{pair.word}</h3>
            <h3>{pair.meaning}</h3>
            <p>{pair.diff}</p>
            <div>
                <FaPen onClick={()=>{
                    setEditId(pair.id);
                    showEdit();
                }}/>   
                <FaTimes onClick={()=>onDelete(pair.id)}/>
            </div>
        </div>
    )
}

export default Wordpair
