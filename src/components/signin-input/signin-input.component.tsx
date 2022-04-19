import React from 'react'

import './signin-input.styles.scss'

interface PropsType {
  type: string
  name: string
  value: string
  label: string
  handleChange: any
  required: any
}

const SignInInput = ({ handleChange, label }: PropsType) => (

  <div className='group'>
    <input className='form-input' onChange={handleChange} />
    {
        label ?
        (<label className={`form-input-label`}>
            {label}
        </label>)
        : null
    }
  </div>

)

export default SignInInput
