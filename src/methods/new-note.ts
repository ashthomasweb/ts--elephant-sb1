// new-note.tsx

import { newIdFinder, zIndexFinder } from './num-finders'

export const newNoteGenerator = (notesObj: any, newNote: any, isMat=false, ref:any=null) => {
    let note = { ...newNote }
    let notes = [...notesObj]
    note.id = newIdFinder(notesObj)
    note.zIndex = zIndexFinder(notes)
    if (ref) {
        note.top = `${ref.current.parentElement.parentElement.scrollTop + (220 + (Math.random() * 50))}px`
        note.left = `${ref.current.parentElement.parentElement.scrollLeft + (220 + (Math.random() * 50))}px`
    }
    notes.push(note)
    return notes
}

// END of document
