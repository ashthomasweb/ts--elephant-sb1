


const Arrow = (props: any) => {
    console.log(props)
    return (
    <line style={{pointerEvents: 'all'}} x1={props.arrowData.first.left} y1={props.arrowData.first.top} x2={props.arrowData.second.left} y2={props.arrowData.second.top} stroke='black' strokeWidth='10' />
  )
    }
  export default Arrow
  
  // END of document
  