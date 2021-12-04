import { useState } from "react"
import Button from "../Button"
import Result from "./Result"


const Lesson = ({lesson, wordpairs, sentences}) => {
    const [showForm, setShowForm] = useState(true)
    const [solution, setSolution] = useState([])
    const [sentenceCorrect, setSentenceCorrect] = useState([])
    console.log(sentences)
    var wordsArray = []
    var sentenceArray = []
    var abcdArray=[]
    var sentenceAnswers = []
    
    var wordsSol = []
    var sentenceSol = []
    

    const fillArrays = () =>{
        for(let i=0; i<lesson.pairs.length; i++){
            for(let j=0; j<wordpairs.pairs.length; j++){
                if(lesson.pairs[i] === wordpairs.pairs[j].id){
                    wordsArray=[...wordsArray, wordpairs.pairs[j]]
                    console.log(wordsArray)
                }
            }
            wordsSol[i]='.'
        }
        for(let i=0; i<lesson.sentences.length; i++){
            for(let j=0; j<sentences.sentences.length; j++){
                if(lesson.sentences[i] === sentences.sentences[j].id)
                {
                    sentenceArray=[...sentenceArray, sentences.sentences[j]]
                    //sentenceAnswers[i]=sentences.sentences[j].a
                    sentenceAnswers[i]=sentences.sentences[j].a
                    
                    //sentenceArray[i].id=i+1;
                    console.log('létrehozáskor: '+sentenceAnswers[i])
                    console.log(sentenceArray[i])
                }
            }
            console.log(sentenceArray[i].a)
            let answers=[sentenceArray[i].a,sentenceArray[i].b,sentenceArray[i].c,sentenceArray[i].d]
            var array = shuffle(answers)
            console.log(array)
            abcdArray[i]={a: array[0], b: array[1], c: array[2], d: array[3] }
            console.log(abcdArray)
            sentenceSol[i]='.'
            
        }
        
    }
   
    const shuffle = (sentences) =>{
        var array=sentences
        console.log('Original array: ' + array)
        for(let i=array.length-1; i>0;i--){
            const j=Math.floor(Math.random()*(i+1))
            const temp = array[i]
            array[i]=array[j]
            array[j]=temp
        }
        console.log("Shuffled array: " + array)
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
/*
        console.log(wordsSol)
        console.log(sentenceSol)
*/

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
        console.log(solArray)
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
