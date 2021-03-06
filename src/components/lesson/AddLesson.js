import { useState } from "react"
import Button from "../Button"

const AddLesson = ({wordpairs, sentences, onAdd}) => {
    const [lessonpairs, setLessonpairs]=useState([])
    const [lessonsent, setLessonSent] = useState([])
    const [lessonname, setLessonName] = useState('')
    const [showLessonAdd, setShowLessonAdd] = useState(false)
    
    const onAddLesson = ()=>{
        onAdd(lessonname,lessonpairs,lessonsent)
        setShowLessonAdd(!showLessonAdd)
    }
    //Megvizsgálja, hogy az adott szó/mondat hozzá van-e adva a leckéhez
    const contains = (id,type) =>{
        if(type==='w'){
            for(let i=0;i<lessonpairs.length;i++){
                if(lessonpairs[i]===id) return true
            }
            return false
        }
        if(type==='s'){
            for(let i=0;i<lessonsent.length;i++){
                if(lessonsent[i]===id) return true
            }
            return false
        }
    }

    const wordDoubleClick = (id) =>{
        let tempArray = [...lessonpairs, id]
        setLessonpairs(tempArray)
    }
    const sentenceDoubleClick = (id) =>{
        let tempArray=[...lessonsent, id]
        setLessonSent(tempArray)
    }

    return (
        <div>
            {/*A gomb hatására megjelennek a szavak és a mondatok, ezekre duplán kattintva hozzáadódnak a leckéhez*/}
            <Button text='Add' onClick={()=>setShowLessonAdd(!showLessonAdd)}/>
            {showLessonAdd && <div>
            <h3>Words:</h3>
            {wordpairs.map((pair)=>(
                <div className='word' key={pair.id} 
                onDoubleClick={()=>wordDoubleClick(pair.id)}>
                    <h3>{pair.word}</h3>
                    
                </div>
            ))}
            <h3>Sentences:</h3>
            {sentences.map((sentence)=>(
                <div className='word' key={sentence.id}
                onDoubleClick={()=>sentenceDoubleClick(sentence.id)}>
                    <h3>{sentence.sentence}</h3>
                </div>

            ))}
            <input type='text' placeholder='Enter the name of the lesson'
            value={lessonname} onChange={(e)=> setLessonName(e.target.value)}/>
            <Button text='Add lesson' onClick={()=>onAddLesson() }/>
            
            {/*Itt láthatjuk a leckéhez hozzáadott szavakat és mondatokat*/}
            <h3>Selected Words:</h3>
            {wordpairs.map((pair)=>(
                <div key={pair.id} >
                    {contains(pair.id,'w') && <h3>{pair.word}</h3>}
                    
                </div>
            ))}
            <h3>Selected Sentences:</h3>
            {sentences.map((sent)=>(
                <div key={sent.id}> 
                    {contains(sent.id,'s') && <h3>{sent.sentence}</h3>}
                </div>
            ))}
            </div>}
            
        </div>
    )
}

export default AddLesson
