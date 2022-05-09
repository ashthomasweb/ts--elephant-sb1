// arrow.component.tsx
import { useContext } from "react"
import { MainContext } from '../../../context/main/MainState'

const Arrow = (props: any) => {

  const { state: { arrowArray }, dispatch } = useContext(MainContext)

  function arrowDelete(arrowId: any) {
    let newArrowArray = [...arrowArray]
    newArrowArray.forEach((item, index) => {
      if (item.id === arrowId) {
        newArrowArray.splice(index, 1)
      }
    })
    dispatch({ type: 'SET_ALL_ARROWS', payload: {arrowArray: newArrowArray}})
  }

  return (
    <line
      style={{ pointerEvents: 'all', zIndex: '-2147483647', position: 'relative', cursor: 'crosshair' }}
      onDoubleClick={() => arrowDelete(props.id) }
      x1={props.arrowData.originPos.x}
      y1={props.arrowData.originPos.y}
      x2={props.arrowData.endPos.x}
      y2={props.arrowData.endPos.y}
      stroke='black'
      strokeWidth='10'
    />
  )
}
export default Arrow

// END of document
