import React from 'react'
import { useState } from 'react'

const EditWordForm = ({onEdit, showEdit, wordpairs, id}) => {
    const [word,setWord] = useState('-1')
    const [meaning,setMeaning] = useState('-1')
    const [diff,setDiff]= useState('-1')
    
    const tempArray = wordpairs
    var temppair=null;
    const findPair = ()=>{
        for(let i=0; i<tempArray.length; i++){
            if(tempArray[i].id === id)
                temppair=tempArray[i]
        }
        
         


    }
    findPair()
    console.log('a')
    const onSubmit = (e) => {
        e.preventDefault()
        
        const ret = {'word': word ==='-1' ? temppair.word : word, 
                    'meaning': meaning ==='-1' ? temppair.meaning : meaning, 
                    'diff':diff === '-1' ? temppair.diff : diff}
        console.log(ret)
        onEdit(id, ret)
        showEdit()
    }   
    
    return (
        
        <form className='editWord' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Word</label>
                <input type='text' placeholder={temppair.word} 
                value={word === '-1' ? temppair.word : word} 
                onChange={(e) => setWord(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Meaning</label>
                <input type='text' placeholder='' 
                value={meaning === '-1' ? temppair.meaning : meaning} 
                onChange={(e) => setMeaning(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Difficulty</label>
                <input type='text' placeholder='' 
                value={diff === '-1' ? temppair.diff : diff}
                
                onChange={(e) => setDiff(e.target.value)}/>
            </div>

            <input className='btn' type='submit' value='Save word' />
        </form>
    )
}

export default EditWordForm
