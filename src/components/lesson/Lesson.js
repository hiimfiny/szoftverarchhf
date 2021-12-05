import { useState } from "react"
import Button from "../Button"
import Result from "./Result"


const Lesson = ({lesson, wordpairs, sentences}) => {
    const [showForm, setShowForm] = useState(true)
    const [solution, setSolution] = useState([])
    const [sentenceCorrect, setSentenceCorrect] = useState([])

    var wordsArray = []
    var sentenceArray = []
    var abcdArray=[]
    var sentenceAnswers = []
    var wordsSol = []
    var sentenceSol = []

    const fillArrays = () =>{
        for(let i=0; i<lesson.pairs.length; i++){
            for(let j=0; j<wordpairs.length; j++){
                if(lesson.pairs[i] === wordpairs[j].id){
                    wordsArray=[...wordsArray, wordpairs[j]]
                }
            }
            wordsSol[i]='.'
        }
        for(let i=0; i<lesson.sentences.length; i++){
            for(let j=0; j<sentences.length; j++){
                if(lesson.sentences[i] === sentences[j].id)
                {
                    sentenceArray=[...sentenceArray, sentences[j]]
                    sentenceAnswers[i]=sentences[j].a
                }
            }
            let answers=[sentenceArray[i].a,sentenceArray[i].b,sentenceArray[i].c,sentenceArray[i].d]
            var array = shuffle(answers)
            abcdArray[i]={a: array[0], b: array[1], c: array[2], d: array[3] }
            sentenceSol[i]='.'
        }  
    }
   
    const shuffle = (sentences) =>{
        var array=sentences
        for(let i=array.length-1; i>0;i--){
            const j=Math.floor(Math.random()*(i+1))
            const temp = array[i]
            array[i]=array[j]
            array[j]=temp
        }
        return array
    }

    const findWord = (word) =>{
        for(let i=0;i<wordsArray.length;i++){
            if(wordsArray[i].word===word){
                return i
            }
        }
    }

    const findSentence = (sentence) => {
        for(let i=0; i<sentenceArray.length;i++){
            if(sentenceArray[i].sentence === sentence){
                return i
            }
        }
    }

    fillArrays()

    const onSubmit = (e) => {
        e.preventDefault()
        setSentenceCorrect(sentenceAnswers)

        let solArray= []
        for(let i=0;i<wordsSol.length;i++){
            solArray[i]=wordsSol[i]
        }
        const w=wordsSol.length
        for(let j=0;j<sentenceSol.length;j++){
            solArray[w+j]=sentenceSol[j]
        }
        setSolution(solArray)
        setShowForm(!showForm)
        
    }
    
    return (
        <div>
            {showForm &&<form onSubmit={onSubmit}>
            
            {wordsArray.map((pair)=>(
                
                <div className='wordSubmit'>
                <h3>{pair.word}</h3>
                <input type='text' placeholder='...'
                 onChange={(e)=> {wordsSol[findWord(pair.word)]=(e.target.value); }}/>
                </div>
            ))}
            {sentenceArray.map((sentence)=>(
                <div key={sentenceArray.id} className='sentenceSubmit'>
                    
                    <h3>{sentence.sentence}</h3>
                    <Button text={abcdArray[findSentence(sentence.sentence)].a} 
                    onClick={()=>sentenceSol[findSentence(sentence.sentence)]=abcdArray[findSentence(sentence.sentence)].a}/>
                    <Button text={abcdArray[findSentence(sentence.sentence)].b} 
                    onClick={()=>sentenceSol[findSentence(sentence.sentence)]=abcdArray[findSentence(sentence.sentence)].b}/>
                    <Button text={abcdArray[findSentence(sentence.sentence)].c} 
                    onClick={()=>sentenceSol[findSentence(sentence.sentence)]=abcdArray[findSentence(sentence.sentence)].c}/>
                    <Button text={abcdArray[findSentence(sentence.sentence)].d} 
                    onClick={()=>sentenceSol[findSentence(sentence.sentence)]=abcdArray[findSentence(sentence.sentence)].d}/>
                </div>
            ))}
            
            <br/>
            <input className='btn' type='submit' value='Submit answers' />
        </form>}

        {!showForm && <Result words={wordsArray} sentences={sentenceArray}
        solution={solution} correct={sentenceCorrect} />}
        </div>
        
    )
}

export default Lesson
