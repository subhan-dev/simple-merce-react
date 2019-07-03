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

                // Kirim action ke reducer, untuk disimpam username
                dispatch(
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {id,username}
                    }
                )

                // Create data untuk cookie
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
