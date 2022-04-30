// new-note.tsx

import { newIdFinder, zIndexFinder, zIndexFinderMat } from './num-finders'

export const newNoteGenerator = (notesObj: any, newNote: any, isMat=false, ref:any=null) => {
    let note = { ...newNote }
    let notes = [...notesObj]
    note.id = newIdFinder(notesObj)
    if (ref) {
        note.top = `${ref.current.parentElement.parentElement.scrollTop + (220 + (Math.random() * 50))}px`
        note.left = `${ref.current.parentElement.parentElement.scrollLeft + (220 + (Math.random() * 50))}px`
    }
    if (isMat) {
        note.isMatBoard = true
        note.zIndex = zIndexFinderMat(notes)
    } else {
        note.zIndex = zIndexFinder(notes)
    }
    notes.push(note)
    return notes
}

// END of document
