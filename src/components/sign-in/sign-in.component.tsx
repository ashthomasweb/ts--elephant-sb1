// sign-in.component.tsx

import { Component } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

interface PropsType {
}

interface StateType {
  email: string
  password: string
}

class SignIn extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async (event: any) => {
    event.preventDefault()
    const { email, password } = this.state
    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: email, password: password })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (event: any) => {
    const { value, name } = event.target
    this.setState({ ...this.state, [name]: value })
  }

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password.</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='Email'
            autoComplete='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            autoComplete='current-password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            <button
              type='button'
              onClick={signInWithGoogle}
              className='google-sign-in custom-button'>
              Use Google
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn

// END of document
