import { useState } from "react"

const EditSentenceForm = ({onEdit, showEdit,sentences ,id}) => {
    const [sentence, setSent] = useState('.')
    const [a, setA] = useState('.')
    const [b, setB] = useState('.')
    const [c, setC] = useState('.')
    const [d, setD] = useState('.')
    const [diff, setDiff] = useState('.')
    
    const tempArray=sentences
    var tempSent=null

    const findSent = ()=>{
        for(let i=0; i<tempArray.length; i++){
            if(tempArray[i].id === id)
                tempSent=tempArray[i]
        }
    }
    findSent()
    
    const onSubmit = (e) => {
        e.preventDefault()
        const ret={
            'sentence' : sentence ==='.' ? tempSent.sentence : sentence,
            'a' : a ==='.' ? tempSent.a : a,
            'b' : b ==='.' ? tempSent.b : b,
            'c' : c ==='.' ? tempSent.c : c,
            'd' : d ==='.' ? tempSent.d : d,
            'diff' : diff ==='.' ? tempSent.diff : diff, 
        }
        onEdit(id,ret)
        showEdit()
    }

    return (
        <form className='addWord' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Sentence</label>
                <input type='text' placeholder={tempSent.sentence} 
                value={sentence ==='.' ? tempSent.sentence : sentence}
                onChange={(e)=>setSent(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Options</label>
                <input style={{width: 200 }}
                type='text' placeholder={tempSent.a} 
                value={a ==='.' ? tempSent.a : a} 
                onChange={(e)=>setA(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder={tempSent.b} 
                value={b ==='.' ? tempSent.b : b} 
                onChange={(e)=>setB(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder={tempSent.c} 
                value={c ==='.' ? tempSent.c : c} 
                onChange={(e)=>setC(e.target.value)}/>
                <input style={{width: 200 }}
                type='text' placeholder={tempSent.d} 
                value={d ==='.' ? tempSent.d : d} 
                onChange={(e)=>setD(e.target.value)}/>
            </div>
            
            <div className='form-control'>
                <label>Difficulty</label>
                <input type='text' placeholder={tempSent.diff} 
                value={diff ==='.' ? tempSent.diff : diff} 
                onChange={(e)=>setDiff(e.target.value)}/>
            </div>
            <input className='btn' type='submit' value='Save' />
        </form>
    )
}

export default EditSentenceForm
