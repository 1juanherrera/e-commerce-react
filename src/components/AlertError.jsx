import { useState, useEffect } from 'react'
import '../style/main.scss'

const AlertError = ({isVisible, dismiss}) => {

    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow( isVisible )
      }, [isVisible])
    

    if(show){
        return (
            <div className="alert">
                <div className="alert__content">
                    <div>
                    <i className='bx bx-x-circle'></i>
                    </div>
                        <h3>Failed</h3>
                        <p>Invalid username or password</p>
                    <button onClick={() => dismiss()}>OKAY</button>
                </div>
            </div>
        )
    }
}

export default AlertError