


const Arrow = (props: any) => {
    return (
    <line style={{pointerEvents: 'all'}} x1={props.arrowData.originPos.x} y1={props.arrowData.originPos.y} x2={props.arrowData.endPos.x} y2={props.arrowData.endPos.y} stroke='black' strokeWidth='10' />
  )
    }
  export default Arrow
  
  // END of document
  