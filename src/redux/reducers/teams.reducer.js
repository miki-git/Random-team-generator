export const teams = (state = [], action) => {
    switch (action.type) {
        case "TEAMS_GENERATED":
            return action.value
        default:
            return state
    }
}