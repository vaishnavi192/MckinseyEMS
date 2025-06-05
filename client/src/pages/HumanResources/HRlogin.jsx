import { SignIn } from "../../components/common/sign-in.jsx"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandleGetHumanResources, HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRLogin = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [signinform, setsigninform] = useState({
        email: "",
        password: ""
    })

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, setsigninform, event)
    }

    const handlesigninsubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (loadingbar.current) {
            loadingbar.current.continuousStart();
        }
        try {
            const response = await dispatch(HandlePostHumanResources({ apiroute: "LOGIN", data: signinform })).unwrap()
            if (response.success) {
                setIsLoading(false)
                if (loadingbar.current) {
                    loadingbar.current.complete()
                }
                navigate("/HR/dashboard/dashboard-data")
            }
        } catch (error) {
            setIsLoading(false)
            if (loadingbar.current) {
                loadingbar.current.complete()
            }
        }
    }

    useEffect(() => {
        if (HRState.error.status) {
            setIsLoading(false)
            if (loadingbar.current) {
                loadingbar.current.complete()
            }
        }
    }, [HRState.error.status])


    return (
        <div>
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                {isLoading && <LoadingBar ref={loadingbar} color="#f11946" />}
                <SignIn 
                    image={"../../src/assets/Employee-Welcome.jpg"} 
                    handlesigninform={handlesigninform} 
                    handlesigninsubmit={handlesigninsubmit} 
                    targetedstate={HRState} 
                    statevalue={signinform} 
                    redirectpath={"/auth/HR/forgot-password"} 
                />
            </div>
        </div>
    )
}