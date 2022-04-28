// new-note.tsx

import { newIdFinder, zIndexFinder } from './num-finders'

export const newNoteGenerator = (notesObj: any, newNote: any, isMat=false) => {
    let note = { ...newNote }
    let notes = [...notesObj]
    note.id = newIdFinder(notesObj)
    note.zIndex = zIndexFinder(notes)
    notes.push(note)
    return notes
}

// END of document
