import React from "react";

import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";

import "./signinupmodal.styles.scss";

const SignInUpModal = () => {

  const modalToggle = () => {
    let el = document.querySelector('.sign-modal').style
    el.display === 'block' ? (el.display = 'none') : (el.display = 'block')
  }

   
  return (
    <div className="sign-in-and-sign-up">
      <button style={{position: 'absolute', top: '0', right: '0' }} type="button" onClick={modalToggle}>Close Me</button>
    <SignIn />
    <SignUp />
  </div>
    )
  }

export default SignInUpModal
