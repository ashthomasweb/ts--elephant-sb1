// user-interface.component.tsx

import UserOptions from '../user-options/user-options.component'
import OptionsFrame from '../options-frame/options-frame.component'
import PadFrame from '../pad-frame/pad-frame.component'
import TrashFrame from '../trash-frame/trash-frame.component'
import '../user-interface/user-interface.styles.scss'

type Props = {
  currentUser: any
}

const UserInterface = (props: Props): JSX.Element => {
  return (
    <div className='interface-wrapper'>
      <UserOptions currentUser={props.currentUser} />
      <OptionsFrame currentUser={props.currentUser}/>
      <PadFrame />
      <TrashFrame />
    </div>
  )
}

export default UserInterface

// END of document
