// custom-button.component.tsx

import './custom-button.styles.scss'

interface PropsType {
  type: string
  children: any
}

const CustomButton = ({ children }: PropsType) => (
  <button className={`custom-button`} >
    {children}
  </button>
)

export default CustomButton

// END of document
