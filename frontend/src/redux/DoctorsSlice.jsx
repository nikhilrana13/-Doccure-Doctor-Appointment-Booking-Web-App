import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    Doctors:[],
    loading:false,
    error:null,
}

export const fetchDoctors = createAsyncThunk("Doctor/fetchDoctors",async(_, rejectWithValue)=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/alldoctors`,{withCredentials:true});
        if(response.data){
            //  console.log("doctors",response?.data?.doctors);
             return response?.data?.doctors;
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "failed to fetch doctors");
    }
})

export const DoctorsSlice = createSlice({
    name:"Doctor",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchDoctors.pending,(state,action)=>{
             state.loading = true;
             state.error = null;
        })
        builder.addCase(fetchDoctors.fulfilled,(state,action)=>{
            state.Doctors = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(fetchDoctors.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default DoctorsSlice.reducer