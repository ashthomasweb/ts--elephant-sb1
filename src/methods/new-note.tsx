// new-note.tsx

import { newIdFinder /*zIndexFinder, zIndexFinderMat*/ } from '../methods/num-finders'

export const newNoteGenerator = (notesObj: any, newNote: any, isMat=false) => {
    let inputText = document.querySelector('#input-text') // will need refactor
    let note = { ...newNote }
    let notes = [...notesObj]
    note.id = newIdFinder(notesObj)
    note.noteText = inputText?.textContent
    notes.push(note)
    return notes
}

// END of document
