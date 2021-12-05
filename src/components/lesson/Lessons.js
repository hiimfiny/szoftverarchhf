import { useState } from "react"
import {FaTimes} from 'react-icons/fa'
import Lesson from "./Lesson"
import Button from "../Button"
import AddLesson from "./AddLesson"

const Lessons = ({lessons,wordpairs, sentences, onDelete, onAdd, mod}) => {
    
    
    var showArray = []
    for(let i=0; i<lessons.length;i++){
        showArray[i]=false
    }
    const [lessonShow, setLessonShow] = useState(showArray)
    console.log(lessonShow)
    
    const updateShow = index => {
        let tempArray = [...lessonShow]
        tempArray[index]=!tempArray[index]
        setLessonShow(tempArray)
        console.log(lessonShow)
    }

    return (
        <div>
            {mod && <AddLesson wordpairs={wordpairs} sentences={sentences}
            onAdd={onAdd}/>}
            <h3>Lessons:</h3>
            {lessons.map((lesson)=>(
                <div key={lesson.id}>
                    
                    <h3>{lesson.name}</h3>
                    <FaTimes style={{cursor: "pointer"}}
                    onClick={()=>onDelete(lesson.id)}/>
                    <br/>
                    {!mod && <Button text='Solve'onClick={()=>updateShow(lesson.id-1)}/>}
                    {lessonShow[lesson.id-1] && <Lesson key={lesson.id} lesson={lesson}
                    wordpairs={wordpairs} sentences={sentences}/>}
                </div>
                
            ))}
        </div>
    )
}

export default Lessons
