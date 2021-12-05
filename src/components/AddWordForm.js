import { useState } from 'react'

const AddWordForm = ( {onAdd, showAdd}) => {

    const [word,setWord] = useState('')
    const [meaning,setMeaning] = useState('')
    const [diff,setDiff]= useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onAdd({word,meaning,diff})
        showAdd()
    }   

    return (
        
        <form className='addWord' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Word</label>
                <input type='text' placeholder='' 
                value={word} onChange={(e) => setWord(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Meaning</label>
                <input type='text' placeholder='' 
                value={meaning} onChange={(e) => setMeaning(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Difficulty</label>
                <input type='text' placeholder='' 
                value={diff} onChange={(e) => setDiff(e.target.value)}/>
            </div>

            <input className='btn' type='submit' value='Save word' />
        </form>
    )
}

export default AddWordForm
