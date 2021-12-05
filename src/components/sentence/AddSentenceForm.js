import { useState } from "react"

const AddSentenceForm = ({showAdd, onAddSentence}) => {
    
    const [sentence, setSent] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [diff, setDiff] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()
        onAddSentence({sentence,a,b,c,d,diff})
        showAdd()
    }
    //Egy formot ad vissza, amiben a mondat paramétereit adhatjuk meg
    return (
        <form className='addWord' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Sentence</label>
                <input type='text' placeholder='Enter your sentence ___ like this' 
                value={sentence}
                onChange={(e)=>setSent(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Options</label>
                <input style={{width: 200 }}
                type='text' placeholder='a)' 
                value={a} onChange={(e)=>setA(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder='b)' 
                value={b} onChange={(e)=>setB(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder='c)' 
                value={c} onChange={(e)=>setC(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder='d)' 
                value={d} onChange={(e)=>setD(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Difficulty</label>
                <input type='text' placeholder='Difficulty' 
                value={diff} onChange={(e)=>setDiff(e.target.value)}/>
            </div>
            <input className='btn' type='submit' value='Save' />
        </form>
    )
}

export default AddSentenceForm
