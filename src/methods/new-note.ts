// new-note.tsx

import { newIdFinder, zIndexFinder, zIndexFinderMat } from './num-finders'

export const newNoteGenerator = (notesObj: any, newNote: any, isMat: boolean = false, ref: any = null) => {
    let notes = [...notesObj]
    let note = { 
        ...newNote,
        id: newIdFinder(notesObj),
        isMatBoard: isMat
    }
    
    if (ref) { // leave full ref path - will get wrong note id otherwise
        note.top = `${ref.current.parentElement.parentElement.scrollTop + (220 + (Math.random() * 50))}px`
        note.left = `${ref.current.parentElement.parentElement.scrollLeft + (220 + (Math.random() * 50))}px`
    }

    isMat ? (note.zIndex = zIndexFinderMat(notes)) : (note.zIndex = zIndexFinder(notes))

    notes.push(note)
    return notes
}

export const firstDragHandler = (notes: any[]) : any[] => {
    let latest = notes[notes.length-1]
    if (latest.isFirstDrag) {
        latest.zIndex = -2147483647
        latest.zIndex = latest.isMatBoard ? zIndexFinderMat(notes) : zIndexFinder(notes)
        latest.isFirstDrag = false
      }
    return notes
}

// END of document
