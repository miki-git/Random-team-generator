let counter = 0

export const playersList = (state = [], action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            counter += 1
            return [...state, {name: action.value, id: counter}]
        case "REMOVE_PLAYER":
            return state.filter(player => player.id !== action.value)
        default:
            return state
    }
}