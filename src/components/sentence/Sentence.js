import {FaTimes} from 'react-icons/fa'
import {FaPen} from 'react-icons/fa'

const Sentence = ( {sentence,showEdit,setEditId, onDelete} ) => {
    return (
        <div className='word'>
            <div>
                <h3>{sentence.sentence}</h3>
                <p>{sentence.diff}</p>
            </div>
            <div>
                <p>a) {sentence.a}</p>
                <p>b) {sentence.b}</p>
                <p>c) {sentence.c}</p>
                <p>d) {sentence.d}</p>
            </div>
            <div>
                <FaPen style={{cursor: "pointer"}}
                    onClick={()=>{
                    setEditId(sentence.id)
                    showEdit()
                }} />   
                <FaTimes style={{cursor: "pointer"}}
                onClick={()=>onDelete(sentence.id)} />
            </div>
        </div>
    )
}

export default Sentence
