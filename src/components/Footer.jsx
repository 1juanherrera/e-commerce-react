import '../style/main.scss'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 2.0}}
        className='footer'>
        <span className='footer__made-by'>Made by <b>Juan Herrera</b></span>
        <div className='footer__table'></div>
        <span className='footer__follow-me'>Follow me</span>
        <a className='footer__github-icon' target='_blank' href='https://github.com/1juanherrera'><i className='bx bxl-github'></i></a>
      </motion.div>
    )
}

export default Footer