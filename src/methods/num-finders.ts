// num-finder.ts

export const newIdFinder = (notesObj: any) : number => {
    let idList: number[] = [0]
    notesObj.length && notesObj.forEach((note: any) => idList.push(note.id))
    return Math.max.apply(null, idList) + 1
}

export const zIndexFinder = (notesObj: any[]) : number => {
    let zList: number[] = [0]
    notesObj.forEach((note: any) => zList.push(note.zIndex))
    // NEED conditional to reset index if too large...outlying case, but would stop the stacking ability if maxed...after an estimated 2038.1 hours of dragging of notes.
    // Needs to retain stack order, but reduce zIndexes to a workable range, without taking them below 0
    return Math.max.apply(null, zList) + 1
}

export const zIndexDrag = (notes: any[], isMat: boolean = false, isGroup: boolean = false) : number => {
    let newZIndex: number
    isMat ? (newZIndex = zIndexFinderMat(notes, isGroup)) : (newZIndex = zIndexFinder(notes))
    return newZIndex
}

export const zIndexFinderMat = (notes: any[], isGroup: boolean = false) : number => {
    let zList: number[] = [-2147483645]
    notes.forEach((note: any) => {
        note.isMatBoard && (isGroup ? zList.push(note.zIndex + 2) : zList.push(note.zIndex + 1))
    })
    return Math.max.apply(null, zList) + 1
}

export const indexFinder = (notesObj: any, id: string | number) : number => {
    let newIndex: any
    notesObj.forEach((note: any) => {
        note.id === Number(id) && (newIndex = notesObj.indexOf(note))
    })
    return newIndex
}

// END of document
