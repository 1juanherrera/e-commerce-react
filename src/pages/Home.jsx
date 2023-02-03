import { filterByTermThunk, filterCategoriesThunk, getProductsThunk } from "../store/slices/products.slice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import '../style/main.scss'
import { motion } from "framer-motion"

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [ categories, setCategories ] = useState([])
    const [ searchValue, setSearchValue ] = useState('')

    useEffect(() => {

        dispatch( getProductsThunk() )

        axios
        .get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
        .then(res => {
            setCategories(res.data.data.categories)
            //console.log(res.data.data.categories)
        })
        .catch(error => console.error(error))
    }, [])

    const filterByTerm = () => {
        console.log(searchValue)
        dispatch(filterByTermThunk(searchValue))
    }

    return (
        <div className="home">
            <motion.div
            initial={{y: -25}}
            animate={{y: -5}}
            transition={{duration: 0.5}}
            className="home__input">
            <input 
            value={searchValue}
            onChange={ (e) => setSearchValue(e.target.value) }
            type="text" placeholder="search products..."/>
            <button onClick={ filterByTerm }><i className='bx bx-search'></i></button>
            </motion.div>
            <motion.div 
            initial={{y: -15, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 2, delay: 0.5}}
            className="home__buttons">
                <button onClick={() => dispatch(getProductsThunk())}>All</button>
                {
                    categories?.map(category => (
                        <button 
                        onClick={() => dispatch(filterCategoriesThunk(category.id))}
                        key={category.id}>
                            {category.name}
                        </button>
                    ))
                }
            </motion.div>
            <motion.div
            initial={{y: -15, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.5}}
            className="home__card">
                {
                    products?.map(newsProduct => (
                        <div className="card-container" key={newsProduct.id}>
                            <div>
                                <img className="img-one" src={newsProduct?.productImgs[0]} alt="" />
                                <img className="img-two" src={newsProduct?.productImgs[1]} alt="" />
                            </div>
                            <div>
                                <span>{newsProduct?.category.name}</span>
                                <h3>{newsProduct.title}</h3>
                                <span>price:</span>
                                <h3>${newsProduct.price}</h3>
                                <Link to={`/products/${newsProduct.id}`}>
                                    <button>Details</button>
                                </Link>
                                <button>Hola</button>
                            </div>
                        </div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default Home