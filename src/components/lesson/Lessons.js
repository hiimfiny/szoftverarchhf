import { useState } from "react"
import Lesson from "./Lesson"
import Button from "../Button"

const Lessons = ({lessons,wordpairs, sentences}) => {
    var showArray = []
    for(let i=0; i<lessons.lessons.length;i++){
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
            
            {lessons.lessons.map((lesson)=>(
                <div key={lesson.id}>
                    <h3>{lesson.name}</h3>
                    <Button text='Solve'onClick={()=>updateShow(lesson.id-1)}/>
                    {lessonShow[lesson.id-1] && <Lesson key={lesson.id} lesson={lesson}
                    wordpairs={wordpairs} sentences={sentences}/>}
                </div>
                
            ))}
        </div>
    )
}

export default Lessons
