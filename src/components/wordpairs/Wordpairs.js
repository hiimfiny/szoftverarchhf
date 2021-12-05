import { useState } from "react"
import Wordpair from "./Wordpair"
import Button from "../Button"
import AddWordForm from "./AddWordForm"
import EditWordForm from "./EditWordForm"

const Wordpairs = ({wordpairs, onAdd, onEdit, onDelete}) => {
    const [showAdd, setShowAdd] = useState(false) 
    const [showEdit, setShowEdit] = useState(false)
    const [editId, setEditId] = useState('')

    return (
        <div>
          <div>
          <Button text='Add' onClick={()=> setShowAdd(!showAdd)} />
          </div>
          <div> 
             {showAdd && <AddWordForm onAdd={onAdd}  
              showAdd={()=>{setShowAdd(!showAdd)}}/>}
          </div>
          <div>
          {wordpairs.map((pair)=>(
          <Wordpair key={pair.id} pair ={pair} 
          showEdit={()=>setShowEdit(!showEdit)}
          setEditId={setEditId}
          onDelete={onDelete}/>))}
          </div>
          <div>
            {showEdit && <EditWordForm 
            onEdit={onEdit}
            showEdit={()=>{setShowEdit(!showEdit)}}
            wordpairs={wordpairs}
            id={editId}
            />}
          </div>
          
        </div>
    )
}

export default Wordpairs
