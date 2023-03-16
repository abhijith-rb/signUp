import "./register.css"
import React from 'react'
import { Email, Facebook, Instagram, Visibility } from '@mui/icons-material';
import { useState, useEffect } from "react"
import axios from "axios"
import "./register.css"
import { Link } from "react-router-dom";

export default function Register() {

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [rePswd,setRepswd] = useState("");
  const [errMatch, setErrMatch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
   
  const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
  const [rePasswordType, setRePasswordType] = useState("password");
   
  const toggleRePassword =()=>{
      if(rePasswordType==="password")
      {
       setRePasswordType("text")
       return;
      }
      setRePasswordType("password")
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  const handleRePswd = (e) =>{
    setRepswd(e.target.value);
    if(e.target.value===formValues.password){
      setErrMatch("")

    }
    else{
      setErrMatch("Passwords doesn't match")
    }
    console.log(rePswd);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    const sendData = async()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit && rePswd===formValues.password) {
          try {
                  const res = await axios.post("/api/auth/register", {
                    ...formValues
                  });
                  res.data && window.location.replace("/");
                  console.log(res.data);
                } catch (err) {
                  console.log(err);
                }
        }
    }
    sendData();
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Company name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <div className="switches">
            <button id="logInBtn">Log in</button>
            <button id="signUpBtn">Sign Up</button>
        </div>
        <h3>Create your Account</h3>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="username"
              placeholder="Enter your company name"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <input
              type={passwordType}
              name="password"
              placeholder="Enter your Password"
              value={formValues.password}
              onChange={handleChange }
            />
            <Visibility onClick={togglePassword}/>
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <input
              type={rePasswordType}
              name="rePassword"
              placeholder="Re-enter password"
              value={rePswd}
              onChange={handleRePswd }
            />
            <Visibility onClick={toggleRePassword}/>
          </div>
          <p>{errMatch}</p>
          <button id="contBtn">Continue</button>
          <div className="formBot">
            <span>OR</span>
            <span>Login using</span>
            <div class="icons">
              <Facebook style={{color:"blue"}}/>
              <Email style={{color:"red"}}/>
              <Instagram style={{color:"red"}}/>
            </div>
            <span>Already have an account?<Link>Login</Link></span>
          </div>
          
        </div>
      </form>
    </div>
  );
}