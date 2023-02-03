import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import '../style/main.scss'
import SideBar from "./SideBar";


const NavBar = () => {

    const [sidebar, setSidebar] = useState(false);
    const navigate = useNavigate()

    const handleShow = () => {
        const token = localStorage.getItem("token")

        if(token){
            setSidebar(!sidebar)
        }else{
            navigate('/login')
        }
    }

    const [ scroll, setScroll ] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 20 )
        })
    },  []);

    return (
        <motion.div
            initial={{y: -25}}
            animate={{y: -5}}
            transition={{duration: 0.5}}
        className={ scroll ? 'navbar active' : 'navbar'}>
            <Link to='/'><h1>e-commerce</h1></Link>
            <ul className="navbar__list">
                <Link to='/login'><li><i className='bx bx-user'></i></li></Link>   
                <Link to='/purchases'><li><i className='bx bx-shopping-bag'></i></li></Link>
                <li><i onClick={handleShow} className='bx bx-cart-alt'></i></li>
            </ul>
            <SideBar
            sidebar={sidebar}
            setSidebar={setSidebar}
            />
    </motion.div>
    )
}

export default NavBar