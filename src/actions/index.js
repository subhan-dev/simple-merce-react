// Action Creator
import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginUser = (user, pass) => {
    return (dispatch) => { // dispatch adalah function
        axios.get(
            'http://localhost:2019/users',
            {
                params: {
                    username: user,
                    password: pass
                }
            }
        ).then(res => {
            // res.data = [], jumlah isi array menggunakan length
            if(res.data.length > 0){
                const {id, username} = res.data[0]
                dispatch(
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {
                            id: id,
                            username: username
                        }
                    }
                )

                // create cookie for stay login
                cookie.set('userName', {id, username}, {path: '/'})
            } else {
                console.log('Username / Password incorrect')
            }
        })
    }

}

export const keepLogin = (objUser) => {
    // objUser = {id, username}
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const getAllProducts = (products) => {
    return {
        type: "GET_PRODUCTS",
        payload: products
    }
}

export const filterProduct = (fiiProduct) => {
    return {
        type: "FILL_PRODUCT",
        payload: fiiProduct
    }
}

export const getCart = (productCart) => {
    return {
        type: "CART_PRODUCTS",
        payload: productCart
    }
}

export const addCartCount = (orderCount) => {
    return {
        type: "ADD_CART_COUNT",
        payload: orderCount
    }
}