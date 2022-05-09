// arrow.component.tsx

const Arrow = (props: any) => {
  return (
    <line
      style={{ pointerEvents: 'all', zIndex: '-2147483647', position: 'relative' }}
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
