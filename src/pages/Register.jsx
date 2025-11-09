import React, {useState, useEffect}  from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner  from '../components/Spinner'


const Register = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: ''
  })

  const {nombre, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state)=> state.auth)

  useEffect(()=>{

    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      navigate('/login')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {

    e.preventDefault()

    if (password !== password2) {
      toast.error('Las contraseñas no coinciden')
    } else {
      const userData = {
        nombre,
        email,password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h4>
          <FaUser /> Registrar
        </h4>
        <p>
          Por favor crea tu cuenta
        </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type='text'
              className='form-control'
              id='nombre'
              name='nombre'
              value={nombre}
              placeholder='Por favor teclea tu nombre'
              onChange={onChange}
            />
            <input 
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Por favor teclea tu email'
              onChange={onChange}
            />
            <input 
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Por favor teclea tu password'
              onChange={onChange}
            />
             <input 
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Por favor confirma tu password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block'>
              Registrar
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register