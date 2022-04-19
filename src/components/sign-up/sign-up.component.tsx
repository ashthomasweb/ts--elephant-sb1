import React, { Component } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createNewUserProfile } from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

interface PropsType {
}

interface StateType {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

class SignUp extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleSubmit = async (event: any) => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password) 

      await createNewUserProfile(user, { displayName })

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      console.error(error)
    }

  }

  // handleChange = (e: { target: { name: string; value: string }}) => {
  // handleChange = (name: any, value: any) => {


  //   // let key = name
  //   // let value = value
  //   console.log(name, value)
  //   this.setState({...this.state, [name]: value})
  // }

  handleChange = (event: any) => {
    const { value, name } = event.target
    this.setState({ ...this.state, [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <div className='sign-up'>
        <h2 className='title'>Create an Account</h2>
        <span>Sign up with Google or by email</span>

        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            label='Display Name'
            autoComplete='name'
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='text'
            name='email'
            value={email}
            label='Email'
            autoComplete='email'
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            label='Password'
            autoComplete='new-password'
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            label='Confirm Password'
            autoComplete='repeat-password'
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign Up </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp

// END of document
