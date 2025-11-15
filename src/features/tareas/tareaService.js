import axios from "axios";

const API_URL ='https://backendgrupob.onrender.com/api/tareas/'

//Crear Tarea
const crearTarea = async (tareaData, token) =>{
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, tareaData, config)

    return response.data
}

//getTareas
const getTareas = async(token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}


//deleteTareas
const deleteTarea = async (id, token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
}
const response = await axios.delete(API_URL + id, config)
return response.data

}

const tareaService ={
    crearTarea, getTareas, deleteTarea
}

export default tareaService