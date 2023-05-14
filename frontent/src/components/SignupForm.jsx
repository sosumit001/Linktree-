import React, { useState } from 'react';
import './SignupForm.css'
import { ApolloError } from '@apollo/client';
import VerifyEmail from './VerifyEmail';
import App from '../App'


  const SignupForm = (props) => {
  const [fname, setFname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationPage,setVerificationPage] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleInputEffect = (element, k) => {
    
    if(element.value.length > k){
      element.style = 'color:white; background:#c133f5'
    } else {
      element.style = 'color:white'
    
    }
  }

  const removeSpaces = (event) =>  {
    event.target.value = event.target.value.replace(/\s/g, '');
  }

  const handleFnameChange = (event) => {
    const inputField = event.target
    const words = inputField.value.trim().split(" ") 
    const numWords = words.filter(word => word.length > 0).length

    if( numWords !==4 ){
      if(inputField.value.length < 40){
        setFname(inputField.value)
        handleInputEffect(inputField,1)
      }
    }

    
  }

  const handleUsernameChange = (event) => {
    const inputField = event.target
    inputField.value = inputField.value.toLowerCase()

    const regex = /^[a-zA-Z0-9]+$/
    if(!regex.test(inputField.value)){
      inputField.value = inputField.value.replace(/[^a-zA-Z0-9]/g, '');
    }
    handleInputEffect(inputField,4)
    setUsername(inputField.value)
    
  };
  const handlePasswordChange = (event) => {
    handleInputEffect(event.target,7)
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    
    if(event.target.value === password){
    }
    handleInputEffect(event.target,7)
    setConfirmPassword(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      if(password === confirmPassword && password.length >= 8){
        // const result = await addUser({
        //   variables:{username:username, password:password, fullname: fname},
        // })

        // const {data:{signupUser}} = result
      
        // context.checkUserSignup(signupUser)
        setVerificationPage(true)
        console.log(isSignUp)
      } else  {
        
        alert('password should contain 8 character')
        setPassword('')
        setConfirmPassword('')
      }
    } catch(err) {
      if(err instanceof ApolloError) {
        console.log(err)
      }
      else {
        err
      }

    }
    

  };

  const form = verificationPage? (
    <VerifyEmail Username= {username} Fullname={fname} Password = {password} />
  ):(
<div id='form-wrapper'>
<div style={{ background:'black'}}>
  {/* <App/> */}
</div>
<form id="form" onSubmit={handleSubmit}>

<input type="text" spellCheck='false' id="username" name="fname" placeholder='full name' value={fname} onChange={handleFnameChange} /><br />

<input type="text" spellCheck='false' id="username" name="username" placeholder='username' value={username} onChange={handleUsernameChange} /><br />

<input type="password" onInput={removeSpaces} id="password" name="password" placeholder='password' value={password} onChange={handlePasswordChange} /><br />

<input type="password" onInput={removeSpaces} id="confirm-password" placeholder = "confirm pass.." name="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} /><br />

<input  type="submit" id='formButton' value={"signUp"} />
<p>already have account? <a href='/login'>login</a></p>
</form>
</div>
  );

  return form
}




export default SignupForm