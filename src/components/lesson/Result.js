import React from 'react'

const Result = ({words, sentences, solution, correct}) => {
    const questions = []
    const result = []
    const evaulate = () => {
        for(let i=0;i<words.length;i++){
            console.log(words[i].meaning)
            
            questions[i]={id: i, q: words[i].word, a: words[i].meaning}
            if(words[i].meaning === solution[i]) result[i]=1
            else result[i]=0
        }
        const w=words.length
        for(let j=0; j<correct.length;j++){
            console.log(w+j)
            console.log(correct[j])
            
            questions[w+j]={id: w+j, q:sentences[j].sentence, a:correct[j]}
            if(correct[j] === solution[w+j]) result[w+j]=1
            else result[w+j]=0
        }
        console.log(sentences)
        console.log(result)
        console.log(questions)
    }

    evaulate()
    return (
        <div>
            {questions.map((question)=>(
                <div key={question.id} className='word' style={{
                    border: result[question.id]===0 ? '1px solid red' : '1px solid green'
                }}>
                    <h3>{question.q}</h3>
                    <p>Answer: {solution[question.id]}</p>
                    {result[question.id] === 0 && <p>Correct: {
                        question.id<words.length ? words[question.id].meaning : correct[question.id-words.length]}</p>}
                </div>
            ))}
        </div>
    )
}

export default Result
