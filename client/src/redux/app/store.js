import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from "../Slices/EmployeeSlice.js"

export const store = configureStore({
    reducer:{
        employeereducer : EmployeeReducer
    }
})