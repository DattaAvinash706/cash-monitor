

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadExpenses, sendLoginData, sendRegisterData } from "../services/api";


/**
 * @param {function} setUser  - (state)function which is used for storing  the name of the user who is logged in (which is displayed in the navbar )
 * @param {function} setExpenses - (state)function which is used to load all the data from the database and store in state variable expenses
 * @returns {Jsx element} - creates a piechart and return the component 
 */


export default function Auth({ setUser, setExpenses }) {
    const [isLogin, setIsLogin] = useState(true);// state variable used to toggle between signup(registration ) and login
    const [username, setUsername] = useState(""); // store the username input field  which is given by the user 
    const [password, setPassword] = useState("");// store the password input field  which is given by the user 

    const navigate = useNavigate();// used to navigate to the from login page to dashboard when login credentials are correct

    /**
     * send the username and password to the backedn and loads all the expenses of the user 
     * @param {event} form onSubmit event which has the control on the form Behaviour and this function runs everytime the form is being submitted 
     * @returns {} -  function does not return anything but has important  step in user authentication 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();//prevents the form from reloading everytime the form is being submitted 


        if (isLogin) {// checks the sstate value of isLogin to show login component or register component 
            const result = await sendLoginData(username, password);// this function is going to make api call which is used to send the details to the backend for verification of the login details 

            if (result.success) {// if the response is success then it goes into the if block
                setUser({
                    user_id: result.user_id,
                    username: result.username
                });//sets the user state variable 

                const exp = await loadExpenses(); // another api call to load all the expenses of the logged in user 
                if (exp.success) {
                    setExpenses(exp.data)
                }
                navigate("/dashboard");//navigate to the dashboard page if login is successfull 
            } else {
                alert("Login failed!");
            }
        } else {
            const result = await sendRegisterData(username, password);// api call to send the data which is being added in the users database which helps in user to login  

            if (result.success) {
                alert("Registered successfully!");//small pop up which shows registered successfully 
                setIsLogin(true);//back to  login page after registration ,for user to login 
            } else {
                alert("Registration failed!");// pop up which shows registration failed which there is problem in registraion or user already have a account
            }
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <h2>{isLogin ? "Login to continue" : "Create Account"}</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="auth-submit">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="auth-switch">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Create One" : " Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}
