// user-interface.component.tsx

// import { useContext } from "react";
// import { MainContext } from '../../context/main/MainState'
import UserOptions from '../user-options/user-options.component'

import '../user-interface/user-interface.styles.scss'
import OptionsFrame from "../options-frame/options-frame.component";
import PadFrame from "../pad-frame/pad-frame.component"
import TrashFrame from "../trash-frame/trash-frame.component"

type Props = {
  currentUser: any
}

const UserInterface = (props: Props): JSX.Element => {

  // const { state: { mouseOffset, notePosition }, dispatch } = useContext(MainContext)

  return (
    <div className="interface-wrapper">
      <UserOptions currentUser={props.currentUser}/>
      <OptionsFrame />
      <PadFrame />
      <TrashFrame />
    </div>
  )
}

export default UserInterface

// END of document
