// update-helper.ts

export function updateModeCheck(notes: any[]): boolean {
    let updateActive: boolean
    notes.some((note) => note.isUpdate ) ? updateActive = true : updateActive = false
    return updateActive
}

// END of document
