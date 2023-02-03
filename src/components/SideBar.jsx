import axios from "axios"
import { useState, useEffect } from "react"
import getConfig from "../utils/getConfig"

const SideBar = ({sidebar, setSidebar}) => {

    const [ favorites, setFavorites ] = useState([])

    useEffect(() => {
        axios
        .get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then(res => {
            setFavorites(res.data.data.cart.products)
            //console.log(res.data.data.cart.products)
        })
        .catch(error => console.error(error))
    }, [sidebar])

    const checkoutCart = () => {

        axios
        .post('https://e-commerce-api.academlo.tech/api/v1/purchases',
            {
                "street": "Green St. 1456",
                "colony": "Southwest",
                "zipCode": 12345,
                "city": "USA",
                "references": "Some references"
            },
            getConfig()
        )
        .then(res => setFavorites([]))
        .catch(error => console.error(error))
    }

    return (
        <>
        {sidebar && 
        <div className="cart-modal">
        <div className="cart-modal__close">
        <p className="cart-modal__title">Cart</p>
        <button onClick={() => setSidebar(false)}><i className='bx bx-x'></i></button>
        </div>
        <div className="cart-modal__checkout-container">
            { favorites.length !== 0
                ?
                (favorites.map((item) => (
                    <div className="cart-modal__info" key={item.title}>{item.title}</div>
                )))
                :
                (<p>No hay productos seleccionados</p>)
            }
          <button onClick={checkoutCart}
          disabled={ favorites.length == 0 }
           className="cart-modal__checkout">Checkout</button>
            </div>
        </div>
        }
        </>
    )
}

export default SideBar