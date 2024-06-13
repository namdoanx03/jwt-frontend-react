import { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { UserConText } from "../context/UserContext";

const PrivateRoutes = (props) => {
    let history = useHistory();
    const {user} = useContext(UserConText)

    useEffect(() => {
        console.log("check content user:", user)
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push("/login")
            window.location.reload()
        }
        if(session){
            //check role
        }
    }, [])
    return (
        <>
        <Route path ={props.path} component = {props.component}/>
        </>
    )
}
export default PrivateRoutes