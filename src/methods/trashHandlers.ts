// trashHandlers.ts

export const trashBoxDisplay = (e: any) => {
  let xMax = e.view.innerWidth
  let zoomR = 135 / window.devicePixelRatio
  
  if ((e.clientX + 10) > xMax - zoomR && (e.clientY + 17) < zoomR) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('.trash-frame').classList.add('hovered')
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('.trash-frame').classList.remove('hovered')
  }
}

export const trashHandler = (e: any, notesObj: any[]): any[] => {
  let deleteId = e.target.id
  let xMax = e.view.innerWidth
  let zoomR = 135 / window.devicePixelRatio
  if ((e.clientX + 10) > xMax - zoomR && (e.clientY + 17) < zoomR) {
    for (let i = 0; i < notesObj.length; i++) {
      if (notesObj[i].id === Number(deleteId)) {
        notesObj.splice(i, 1)
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.querySelector('.trash-frame').classList.remove('hovered')
  return notesObj
}

// END of document
