// form-input.component.tsx

import './form-input.styles.scss'

interface PropsType {
  type: string
  name: string
  value: string
  label: string
  handleChange: any
  required: any
  autoComplete: string
}

const FormInput = ({ handleChange, label, ...otherProps }: PropsType) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {
        label ?
        (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            {label}
        </label>)
        : null
    }
  </div>
)

export default FormInput

// END of document
