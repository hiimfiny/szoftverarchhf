import { useState } from "react"

const Login = ({onLogin, onClick}) => {
    const [usr, SetUsername] = useState('')
    const [pwd, SetPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onLogin( { usr , pwd } )
        SetUsername('')
        SetPassword('')
        onClick()
        
        
    }

    return (
        <form className='register' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='Enter username' 
                value={usr} onChange={(e) => SetUsername(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='text' placeholder='Enter password'
                value={pwd} onChange={(e) => SetPassword(e.target.value)}/>
            </div>

            <input className='btn' type='submit' value='Login' />
        </form>
    )
}

export default Login
