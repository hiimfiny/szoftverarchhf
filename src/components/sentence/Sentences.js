import { useState } from 'react'
import Button from '../Button'
import EditSentenceForm from './EditSentenceForm'
import AddSentenceForm from './AddSentenceForm'
import Sentence from './Sentence'

const Sentences = ({sentences, onAddSentence, onEdit,onDelete}) => {

    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editId, setEditId] = useState('')
    console.log(sentences)
    return (
        <div>
            <div>
            <Button text='Add' onClick={()=> setShowAdd(!showAdd)} />
            </div>
            <div>
                {showAdd && <AddSentenceForm 
                showAdd={()=>{setShowAdd(!showAdd)}}
                onAddSentence={onAddSentence}/>}
            </div>
            <div>
                {sentences.map((sent)=>(
                    <Sentence key={sent.id} sentence={sent}
                    showEdit={()=>{setShowEdit(!showEdit)}}
                    setEditId={setEditId}
                    onDelete={onDelete} />
                ))}
            </div>
            
            <div>
                {showEdit && <EditSentenceForm
                onEdit={onEdit}
                showEdit={()=>{setShowEdit(!showEdit)}}
                language={sentences}
                id={editId} 
                
                />}
            </div>
        </div>
    )
}

export default Sentences
