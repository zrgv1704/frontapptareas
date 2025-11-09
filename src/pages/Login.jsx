import React, {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import {login, reset} from '../features/auth/authSlice'

const Login = () => {
  
  const [formData, setFormData] =useState({
    email:'',
    password:''
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(() =>{

    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      navigate('/')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) =>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  const onSubmit = (e) =>{
    e.preventDefault()


    const userData = {
      email, 
      password
    }

    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner />
  }

  
  return (
    <>
      <section className="heading">
        <h4>
          <FaSignInAlt /> Login
        </h4>
        <p>
          Por favor teclea tus credenciales.
        </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='Por favor tecle tu email'
            value={email}
            onChange={onChange}
            />
             <input 
            type='password'
            className='form-control'
            id='password'
            name='password'
            placeholder='Por favor tecle tu password'
            value={password}
            onChange={onChange}
            />
          </div>
          <div className="group-form">
            <button type='submit' className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login