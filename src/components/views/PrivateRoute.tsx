import { Navigate } from "react-router-dom"

const PrivateRouter = (props: any) => {

    const accessToken = sessionStorage.getItem('access_token')

    return (
        accessToken != null ? props.children : <Navigate to="/login" />
    )
}

export default PrivateRouter