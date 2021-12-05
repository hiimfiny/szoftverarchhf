import './App.css';
import { useState, useEffect } from "react"

import Button from './components/Button';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';
import Wordpairs from './components/Wordpairs';
import Sentences from './components/sentence/Sentences';
import Lessons from './components/lesson/Lessons';


function App() {
  const [wordpairs, setWordPairs] = useState([])
  const [sentences, setSentences] = useState([])
  const [lessons, setLessons] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getWords = async () => {
      setWordPairs(await fetchWords())
    }
    const getSentences = async () =>{
      setSentences(await fetchSentences())
    }
    const getLessons = async ()=>{
      setLessons(await fetchLessons())
    }
    const getUsers = async ()=>{
      setUsers(await fetchUsers())
    }

    getWords()
    getSentences()
    getLessons()
    getUsers()
  }, [])
  
  const fetchWords = async () =>{
    const res = await fetch('http://localhost:5000/wordpairs')
    const data = await res.json()
    return data
  }
  const fetchSentences = async () =>{
    const res = await fetch('http://localhost:5000/sentences')
    const data = await res.json()
    return data
  }
  const fetchLessons = async () =>{
    const res = await fetch('http://localhost:5000/lessons')
    const data = await res.json()
    return data
  }
  const fetchUsers = async () =>{
    const res = await fetch('http://localhost:5000/users')
    const data = await res.json()
    return data
  }

  const[showRegister, setShowRegister] = useState(false)
  const[showLogin, setShowLogin] = useState(false)
  const[showPairs, setShowPairs] = useState(false)
  const[showSentences, setShowSentences] = useState(false)
  const[showLessons, setShowLessons] = useState(false)
  const[mod, setMod] = useState(false)

  const setRegFunc = () => {setShowRegister(!showRegister)}
  const setLogFunc = () => {setShowLogin(!showLogin)}


  //---User functions---
  //Adding user
  const addUser = async (user) => {
    const res = await fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{ 'Content-type': 'application/json'},
      body: JSON.stringify(user)
    })
    setUsers(await fetchUsers())
  }

  //Login function
  const login = (user) => {
    let alertv = 0
    users.map((userm)=>{
      if(userm.usr === user.usr && userm.pwd === user.pwd) {setMod(userm.mod); alertv=1}
      else {if(alertv==0) {alert("Incorrect username or password"); alertv=1}}
    })
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
    //const updatedWord=wordpair
    const res = await fetch(`http://localhost:5000/wordpairs/${id}` ,{
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(wordpair)
    })

    setWordPairs(await fetchWords())
  }

  //---Sentence functions---
  //Adding sentence
  const addSentence = async (sentence) => {
    const res = await fetch('http://localhost:5000/sentences',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify(sentence),
  })
  setSentences(await fetchSentences())
  }

  //Deleting sentence
  const deleteSent = async (id) =>{
    await fetch(`http://localhost:5000/sentences/${id}`, {
      method: 'DELETE'
    })
    setSentences(await fetchSentences())
  }

  //Editing sentence
  const editSentence = async (id, sentence) => {
    const res = await fetch(`http://localhost:5000/sentences/${id}` ,{
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(sentence)
    })
    setSentences(await fetchSentences())
  }
  //---Lesson functions---
  //Adding lesson
  const addLesson = async (name,pairs,sentences) =>{
    const id=lessons.length+1
    const newLesson={id,name,pairs,sentences}
    const res = await fetch('http://localhost:5000/lessons',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({name,pairs,sentences}),
  })
    setLessons(await fetchLessons())
  }

  //Deleting lesson
  const deleteLesson = async (id) =>{
    await fetch(`http://localhost:5000/lessons/${id}`,{
      method: 'DELETE'
    })
    setLessons(await fetchLessons())
  }
  return (
    <div className="App">
      <Header title ={"Nyelvtanulást segítő alkalmazás"} regfunc = {setRegFunc} logfunc = {setLogFunc} />
    
      <div>
      {showRegister && <Register onRegister={addUser}
      onClick={()=>setShowRegister(!showRegister)}/>}

      {showLogin && <Login onLogin={login} 
      onClick={()=> setShowLogin(!showLogin)}/>}
      </div>
      <div>
        {mod && <Button text='Wordpairs' onClick={()=>{setShowPairs(!showPairs)}}/>}
        {mod && <Button text='Sentences' onClick={()=>{setShowSentences(!showSentences)}}/>}
        {<Button text='Lessons' onClick={()=>{setShowLessons(!showLessons)}}/>}
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
        {showLessons && <Lessons lessons={lessons} wordpairs={wordpairs} 
        sentences={sentences} onDelete={deleteLesson} onAdd={addLesson} mod={mod}/>}
        
      </div>
      {/**/}
    </div>
    
  );
}

export default App;
