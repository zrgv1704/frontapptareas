import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tareaService from './tareaService'


const initialState ={
    tareas: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:''
}

//Crear una tarea
export const crearTarea = createAsyncThunk('tareas/crear', async(tareaData, thunkApi )=>{
    try{
        const token = thunkApi.getState().auth.user.token
        return await tareaService.crearTarea(tareaData,token)
    }
    catch (error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const tareaSlice = createSlice({
    name: 'tarea',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
   extraReducers: (builder) =>{
    builder
    .addCase(crearTarea.pending, (state) =>{
        state.isLoading=true
    })
    .addCase(crearTarea.fulfilled, (state,action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.tareas.push(action.payload)
    })
    .addCase(crearTarea.rejected, (state,action) =>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
    })
    }
})

export const { reset } = tareaSlice.actions
export default tareaSlice.reducer