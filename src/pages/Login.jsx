import '../style/main.scss'
import AlertError from '../components/AlertError'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alert, setAlert ] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data ={
            email,
            password
        }

        axios
        .post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
        .then(res => {
            //console.log(res.data.data.token)
            localStorage.setItem('token', res.data.data.token)
            navigate('/')
        })
        .catch(error => {
            console.error(error)
            setAlert(true)
        })
    }

    const [ isLogged, setIsLogged ] = useState(localStorage.getItem('token'))

    // const isLogged = localStorage.getItem('token')

    const logOut = () => {
        localStorage.clear()

        setIsLogged(false)
    }

    return (
        <>
        {
            isLogged
            ?
            <div className='log-out'>
                <div className='log-out__icon'>
                    <i className='bx bx-user-circle'></i>
                </div>
                <button onClick={ logOut }>Log out</button>
            </div>
            :
            <div className='form-container'>
            <form onSubmit={(e) => handleSubmit(e) } className='form'>
                <h2>Login</h2>
                <p className='form__paragraph'>Not a member? <a className='form__link' href="#">Signup</a></p>
                <div className='form__container'>
                    <div>
                        <input 
                        type="email" 
                        value={email}
                        id='email'
                        onChange={ (e) => setEmail(e.target.value) }
                         placeholder='' />
                        <label 
                        htmlFor="email" 
                        className='form__label'>Email:</label>
                        <span></span>
                    </div>
                    <div>
                        <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        id='password' 
                        value={password}
                        placeholder='' />
                        <label 
                         htmlFor="password" 
                         className='form__label'>Pasword:</label>
                        <span></span>
                    </div>
                    <button className='form__button'>Login</button>
                </div>
            </form>
            <AlertError 
            isVisible={ alert }
            dismiss={() => setAlert(false)}
            />
        </div>
        }
        
        </>
    )
}

export default Login