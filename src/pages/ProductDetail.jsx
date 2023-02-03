import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createFavoriteThunk } from "../store/slices/favorites.slice"
import { getProductsThunk } from "../store/slices/products.slice"
import '../style/main.scss'


const productDetail = () => {

    const { id } = useParams()
    const [ rate, setRate ] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {

        dispatch( getProductsThunk())

        }, [id]);

        const allProducts = useSelector(state => state.products)
        const product = allProducts.find(products => products.id === Number(id))
        const productsRelated = allProducts.filter(products => products.category.name === product.category.name)
        //console.log(productsRelated)



    const AddToFavorites = () => {
        const token = localStorage.getItem('token')

        if(token){
            const news = {
                id : parseInt(id),
                quantity : rate
            }
            dispatch(createFavoriteThunk(news))
        }else {
            navigate('/login')
        }
    }

    
    return (
        <div
        className='details'>
            <h1>{product?.title}</h1>
            <motion.div 
            initial={{x: 0, opacity: 0}}
            whileInView={{y: [-50, 0], opacity: 1}}
            transition={{duration: 1}}
            className="details__info">
                <div className="details__image">
                <img className="img-one" src={product?.productImgs[0]}/>
                </div>
                <div className="details__all">
                        
                        <span className="details__category">{product?.category.name}</span>
                        <h3>{product?.title}</h3>
                        <div className="details__description"><p>Product description</p></div>
                        <p>{product?.description}</p>
                        <button className="discount" disabled={rate === 1} onClick={() => setRate(rate - 1)}>-</button>
                                <span className="rate">{rate}</span>
                            <button className="count"  onClick={() => setRate(rate + 1)}>+</button>
                        <button onClick={AddToFavorites} className="add-fav">Add to cart <i className='bx bx-cart-alt'></i></button>
                </div>
            </motion.div>
            <div className="related">
            {
                productsRelated.map((related) => (
                    <motion.div
                    initial={{x: 0, opacity: 0}}
                    whileInView={{y: [50, 0], opacity: 1}}
                    transition={{duration: 1}}
                    className="related__container" key={related.id}>
                        <div>
                            <img className="img-one" src={related?.productImgs[0]} alt="" />
                            <img className="img-two" src={related?.productImgs[1]} alt="" />
                        </div>
                        <div>
                                <span>{related.category.name}</span>
                                <h3>{related.title}</h3>
                                <span>price:</span>
                                <h3>${related.price}</h3>
                                <Link to={`/products/${related.id}`}>
                                    <button>Details</button>
                                </Link>
                            </div>
                    </motion.div>
                ))
            }
            </div>
        </div>
    )
}

export default productDetail