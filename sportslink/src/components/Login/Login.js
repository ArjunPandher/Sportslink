import React from 'react'
import "./Login.css"

import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

import Input from "../Input/Input.js";

import { login} from "../../actions/user.js";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.props.history.push("/login");
    }
    
    state = {
        usern: "",
        password: "",
        loginError: "",
        users: [
            {usern: "user", password: "user"},
            {usern: "admin", password: "admin"}
        ]
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log(name)
        this.setState({
            [name]:value
        });
    };

    handleEnter = (event) => {
        if (event.key === 'Enter'){
            const {app} = this.props
            login(this, app)
        }
    }

    render() {
        const { app } = this.props;
        return (
            <div className="loginPage">
                <div className='loginTitle'><h1>Sportslink</h1><p>Bringing together the greatest athletic community around the globe.</p></div>
                <div className="loginContainer">
                    <h1>Log in</h1>
                    <Input
                        error ={this.state.loginError !== "" ? true : false }
                        errorText={this.state.loginError}
                        name="usern"
                        onChange={this.handleChange}
                        label="Username"
                        onKeyPress={this.handleEnter}
                    />

                    <Input
                        error ={this.state.loginError !== "" ? true : false }
                        errorText={this.state.loginError}
                        name="password"
                        onChange={this.handleChange}
                        label="Password"
                        onKeyPress={this.handleEnter}
                        type="password"
                    />

                    <br/>
                    <Button
                        variant="contained"
                        onClick={() => login(this, app)}
                        className="loginButton"
                        color="primary"
                    > 
                        Log In    
                    </Button>

                    <div className="buttonContainer">
                        <Link to="/signup">
                            <Button
                                variant="contained"
                                className="signupButton"
                            > 
                                Make an account!
                            </Button>
                        </Link>
                        
                        <div className="rightContainer">
                            <Link to="/forgotpassword">
                                <Button
                                    variant="contained"
                                    className="forgotButton"
                                > 
                                    Forgot Password?  
                                </Button>
                            </Link>  
                            
                        </div>
                    </div>
                        
                </div>
            </div>
        )
    }
}

export default Login