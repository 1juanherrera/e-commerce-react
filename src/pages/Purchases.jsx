import axios from "axios"
import { useState, useEffect } from "react"
import getConfig from '../utils/getConfig'


const Purchases = () => {

    const [ purchases, setPurchases ] = useState([])

    useEffect(() => {
        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/purchases/", getConfig())
        .then((resp) => {
            console.log(resp.data.data.purchases)
            setPurchases(resp.data.data.purchases)
        })
      . catch((error) => console.error(error));
    }, [])

    return (
        <div className="purchases">
          <h1>Purchases</h1>
        {
            purchases.map((item) => {
            return item.cart.products?.map((item) => <div className="purchases__container" key={item.title}>
              <p>{item.title}</p>
            </div>
            )
          })
        }
      </div>
    )
}

export default Purchases