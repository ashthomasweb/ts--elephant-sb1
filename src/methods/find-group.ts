// find-group.ts

import { indexFinder } from "./num-finders"

export const getGroupIds = (newMatId: string, notes: any[]) : number[] => {

    // loops through all notes and checks to see if there is an overlap
    // of given clicked Mat. If there is any overlap with a note, group
    // given note to mat. If there is overlap of another Mat, perform 
    // same check with except with small margin

    let noteGroup: any[] = []

    function pf(input1: string, input2: string = '0') : number {
      return parseFloat(input1) + parseFloat(input2)
    }

    let mat = notes[indexFinder(notes, newMatId)]

    let matTop: number = pf(mat.top)
    let matBottom: number = pf(mat.top, mat.height)
    let matLeft: number = pf(mat.left)
    let matRight: number = pf(mat.left, mat.width)

    notes.forEach((note) => {
      let noteTop: number = pf(note.top)
      let noteBottom: number = pf(note.top, note.height)
      let noteLeft: number = pf(note.left)
      let noteRight: number = pf(note.left, note.width)

      const marginCheckMat = () : void => {
        if (noteTop + 75 > matTop && noteBottom - 75 < matBottom) {
          if (noteLeft + 75 > matLeft && noteRight - 75 < matRight) {
            noteGroup.push(note.id)
            return
          }
        }
      }

      const marginCheckNote = () : void => {
        if (noteBottom > matTop && noteTop < matBottom) {
          if (noteRight > matLeft && noteLeft < matRight) {
            noteGroup.push(note.id)
            return
          }
        }
      }

      note.isMatBoard ? marginCheckMat() : marginCheckNote()
    })

    return noteGroup
}

// END of document
