import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    message: ''
}

const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username
            }

        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: '',
                username: ''
            }
    
        default:
            return data
    }
}

const initData = {
    products: [],
    filProduct: []
}

const getProductsReducer = (data = initData, action) => {
    switch(action.type) {
        case "GET_PRODUCTS":
            return {
                ...data,
                products: action.payload,
                filProduct: action.payload
            }
        case "FILL_PRODUCT":
            return {
                ...data,
                products: action.payload
            }

        default:
            return data
    }
}

const initCart = {
    cart: []
}

const cartReducer = (data = initCart, action) => {
    switch(action.type) {
        case "CART_PRODUCTS":
            return {
                cart: [...data.cart, action.payload]
            }
        case "ADD_CART_COUNT":
            data.cart[action.payload.index].order += action.payload.jumlahOrder
            return {
                cart: [...data.cart]
            }
        default:
            return data
    }
}

export default combineReducers(
    {
        auth: AuthReducer, // {id: 1, username: ''}
        products: getProductsReducer,
        carts: cartReducer
    }
)