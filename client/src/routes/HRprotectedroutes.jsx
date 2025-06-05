import { HandleGetHumanResources } from "../redux/Thunks/HRThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/common/loading.jsx"

export const HRProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)

    if (HRState.isLoading) {
        return (
            <Loading />
        )
    }

    return children
}