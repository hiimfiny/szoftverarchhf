import './App.css';
import { useState, useEffect } from "react"

import Button from './components/Button';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';
import Wordpairs from './components/Wordpairs';
import Sentences from './components/sentence/Sentences';
import Lessons from './components/lesson/Lessons';
import AddLesson from './components/lesson/AddLesson';


function App() {
  const [wordpairs, setWordPairs] = useState([])
  const [sentences, setSentences] = useState([])
  useEffect(() => {
    const getWords = async () => {
      const wordsFromServer = await fetchWords()
      setWordPairs(wordsFromServer)
    }
    const getSentences = async () =>{
      const sentencesFromServer = await fetchSentences()
      setSentences(sentencesFromServer)
    }

    getWords()
    getSentences()
  }, [])
  
  const fetchWords = async () =>{
    const res = await fetch('http://localhost:5000/wordpairs')
    const data = await res.json()
    console.log(data)
    return data
  }
  const fetchWord = async (id) =>{
    const res = await fetch(`http://localhost:5000/wordpairs/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }
  const fetchSentences = async () =>{
    const res = await fetch('http://localhost:5000/sentences')
    const data = await res.json()
    return data
  }
    const [lessons, setLessons] = useState(
      {
          lessons:[
          {
              id: 1,
              name: 'Test Lesson',
              pairs: [2,1],
              sentences: [1,2],
          },
          
          {
              id: 2,
              name: 'Test Lesson 2',
              pairs: [2,3],
              sentences: [2],
          },
          
          
  ]})

  const[showRegister, setShowRegister] = useState(false)
  const[showLogin, setShowLogin] = useState(false)
  const[showPairs, setShowPairs] = useState(false)
  const[showSentences, setShowSentences] = useState(false)
  const[showLessons, setShowLessons] = useState(false)

  const setRegFunc = () => {setShowRegister(!showRegister)}
  const setLogFunc = () => {setShowLogin(!showLogin)}

  const addUser = (user) => {
    console.log(user)
}

  const login = (user) => {
    console.log(`Welcome ${user.usr}`)
  }

  //---Wordpair functions---
  //Adding word
  const addWord = async (wordpair) => {
    const res = await fetch('http://localhost:5000/wordpairs',{
      method: 'POST',
      headers:{ 'Content-type': 'application/json'},
      body: JSON.stringify(wordpair),
    })
    
    setWordPairs(await fetchWords())
  }

  //Deleting word
  const onDelete = async (id) =>{
    await fetch(`http://localhost:5000/wordpairs/${id}`, {method: 'DELETE'})
    setWordPairs(await fetchWords())
  }

  //Editing word
  const editWord = async (id, wordpair) => {
    const updatedWord=wordpair
    const res = await fetch(`http://localhost:5000/wordpairs/${id}` ,{
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(updatedWord)
    })

    setWordPairs(await fetchWords())
  }

  
  //Sentence functions
  const addSentence = async (sentence) => {
    const id=sentences.length+1
    const newSent = {id, ...sentence}
    const res = await fetch('http://localhost:5000/sentences',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(sentence),
  })
    console.log(JSON.stringify(sentence))
    setSentences([...sentences, newSent])
  }
  const deleteSent = async (id) =>{
    await fetch(`http://localhost:5000/sentences/${id}`, {method: 'DELETE'})
    console.log('delete', id)
    setSentences(sentences.filter(sent=> sent.id !== id))
  }
  const editSentence = (id, sentence) => {
    console.log(id, 'edited')
    const  tempArray = sentences
    for(let i=0; i<tempArray.length; i++){
      if(tempArray[i].id === id){
        tempArray[i].sentence=sentence.sentence
        tempArray[i].a=sentence.a
        tempArray[i].b=sentence.b
        tempArray[i].c=sentence.c
        tempArray[i].d=sentence.d
        tempArray[i].diff=sentence.diff
      }
    }
    setSentences([tempArray])
  }

  const addLesson = (name,pairs,sentences) =>{
    const id=lessons.lessons.length+1
    const newLesson={id,name,pairs,sentences}
    console.log(lessons)
    console.log(newLesson)
    setLessons({lessons: [...lessons.lessons, newLesson]})
    console.log(lessons)

  }
  return (
    <div className="App">
      <Header regfunc = {setRegFunc} logfunc = {setLogFunc} />
    
      <div>
      {showRegister && <Register onRegister={addUser}
      onClick={()=>setShowRegister(!showRegister)}/>}

      {showLogin && <Login onLogin={login} 
      onClick={()=> setShowLogin(!showLogin)}/>}
      </div>
      <div>
        <Button text='Wordpairs' onClick={()=>{setShowPairs(!showPairs)}}/>
        <Button text='Sentences' onClick={()=>{setShowSentences(!showSentences)}}/>
        <Button text='Lessons' onClick={()=>{setShowLessons(!showLessons)}}/>
      </div>
      <div>
      {showPairs && <Wordpairs wordpairs={wordpairs} 
      onAdd={addWord}
      onEdit ={editWord} 
      onDelete={onDelete}/>}
      </div>
      
      <div>
        {showSentences && <Sentences sentences={sentences} 
        onAddSentence={addSentence}
        onEdit={editSentence}
        onDelete={deleteSent}/>}
      </div>
      
      <div>
        {showLessons && <Lessons lessons={lessons} wordpairs={wordpairs} sentences={sentences}/>}
      </div>
      {/*
      <div>
        <AddLesson wordpairs={wordpairs} sentences={sentences}
        onAdd={addLesson}/>
      </div>
      */}
    </div>
    
  );
}

export default App;
