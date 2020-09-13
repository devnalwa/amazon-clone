// This file acts as global store. For example, it Stores all the items information so we can pull it from here later.
export const initialState = {
    basket: [],
    user: null
};

// Selector. Reduce Functions. Good Practice in react of building selectors in reducers. 
export const getBasketTotal = (basket) =>
    basket ?.reduce((amount, item) => item.price + amount, 0); // Adding item price totals by iterating through all items in basket and checking price.

const reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item] // Adding whatever was in basket already with any new item added. 
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    'Cant remove product (id: ${action.id}) as its not in basket!'
                )
            }

            return {
                ...state,
                basket: newBasket
            }

        case "SET_USER": // To Listen to user login info. 
            return {
                ...state,
                user: action.user
            }


        default:
            return state;
    }
}

export default reducer;


