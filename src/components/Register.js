import { useState } from "react"

const Register = ( {onRegister, onClick} ) => {

    const [usr, SetUsername] = useState('')
    const [pwd, SetPassword] = useState('')
    const [mod, SetMod] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        onRegister( { usr , pwd, mod } )
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
            <div className='form-control form-control-check'>
                <label>Moderator</label>
                <input type='checkbox' checked={mod}
                value={mod} onChange={(e)=> SetMod(e.currentTarget.checked)}/>
            </div>

            <input className='btn' type='submit' value='Register' />
        </form>
    )
}

export default Register
