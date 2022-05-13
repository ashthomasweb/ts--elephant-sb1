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

  function zoneFinder(e: any) {
    let data = props.arrowData
    let x1 = data.originPos.x
    let y1 = data.originPos.y
    let x2 = data.endPos.x
    let y2 = data.endPos.y
    let clickX = e.window
    let clickY = e.target

    console.log(clickY)
    console.log(e)
    console.log(x1)
    console.log(e.target.x1.baseVal.value, e.target.y1.baseVal.value)
    console.log(e.target.x2.baseVal.value, e.target.y2.baseVal.value)
    // console.log(e.target)

  }

  return (
    <line
      style={{ pointerEvents: 'all', zIndex: '-2147483647', position: 'relative', cursor: 'crosshair' }}
      onDoubleClick={() => arrowDelete(props.id) }
      onMouseDown={zoneFinder}
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
