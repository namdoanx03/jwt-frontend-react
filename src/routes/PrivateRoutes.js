import { useEffect, useContext } from "react"
import { useHistory, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { UserConText } from "../context/UserContext";

const PrivateRoutes = (props) => {
    const {user} = useContext(UserConText)
    if(user && user.isAuthenticated === true){
        return (
            <>
                <Route path = {props.path} component = {props.component} />
            </>
        )
    }else{
        return <Redirect to = '/login'/>
    }
}
export default PrivateRoutes