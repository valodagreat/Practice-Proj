export const initialState = {
    basket: [],
    user: null
};

const reducer = (state, action) =>{
    switch(action.type){
        case 'ADD TO BASKET':
            return {...state, basket:[...state.basket, action.item]}
        case 'REMOVE FROM BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket]
            if(index >= 0){
                newBasket.splice(index, 1)
            }else{
                console.warn(`Can't Remove Product with id ${action.id} as it's not in the basket`)
            }
            return {...state,basket: newBasket}
        case 'SET USER':
            return {...state,user: action.user}
        case "EMPTY BASKET":
            return {...state, basket: []}
        default:
            return state
    }
};

export default reducer;