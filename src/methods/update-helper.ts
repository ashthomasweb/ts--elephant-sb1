// update-helper.ts

export function updateModeCheck(notes: any[]): boolean {
    let updateActive: boolean
    if ( notes.some((note) => note.isUpdate === true ) ) {
        updateActive = true
    } else {
        updateActive = false
    }
    return updateActive
}

// END of document
