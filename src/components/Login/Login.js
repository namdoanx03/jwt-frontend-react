import { useState, useEffect, useContext } from 'react';
import './Login.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService';
import { UserConText } from '../../context/UserContext';

const Login = (props) => {
    const {loginContext} = useContext(UserConText)
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("")
    const [password, setPassword] = useState("")

    const defaultObjValidInput = {
        isValidValueLogin: true, 
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput) 

    const handleCreateNewAccount = () => {
        history.push("/register");
    }
    const handleLogin = async() => {
        setObjValidInput(defaultObjValidInput)
        if(!valueLogin){
            setObjValidInput({...defaultObjValidInput, isValidValueLogin: false})
            toast.error("Please enter your email or phone number")
            return
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error("Please enter your password")
            return 
        }
        let response = await loginUser(valueLogin, password)
        if(response && +response.EC === 0){
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true, 
                token,
                account: {groupWithRoles, email, username}
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            loginContext(data)
            
            history.push("/users")
            // window.location.reload()
        }
        if (response &&  +response.EC !== 0) {
            //error
            toast.error(response.EM)
        }
    }

    const handlePressEnter = (event) => {
        if(event.charCode === 13 && event.code === "Enter"){
           handleLogin()
        }
    }
    useEffect(()=>{
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/")
            window.location.reload()
        }
    }, [])
    
    return (
        <div className="login-container " >
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Namdoanx
                        </div>
                        <div className='detail'>
                            Learning everything...
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
                        <div className='brand d-sm-none '>
                            Namdoanx
                        </div>
                        <input type='text' 
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Email address or phone number'
                            value={valueLogin} 
                            onChange={(event) => {setValueLogin(event.target.value)}}
                            />
                        <input type='password' 
                            className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='Password'
                            value={password} 
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress = {(event) => handlePressEnter(event)}
                                />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forget your password?</a>
                            </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login