// trashHandlers.ts

import { updateModeCheck } from "./update-helper"

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

export const trashHandler = (e: any, notesObj: any[], dispatch: any): any[] => {
  let deleteId = e.target.parentElement.id
  let xMax = e.view.innerWidth
  let zoomR = 135 / window.devicePixelRatio
  if ((e.clientX + 10) > xMax - zoomR && (e.clientY + 17) < zoomR) {
    for (let i = 0; i < notesObj.length; i++) {
      if (notesObj[i].id === Number(deleteId)) {
        notesObj.splice(i, 1)
      }
    }
  }
  !updateModeCheck(notesObj) && dispatch({ type: 'DISABLE_UPDATE_MODE' })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.querySelector('.trash-frame').classList.remove('hovered')
  console.log(notesObj)
  return notesObj
}

// END of document
