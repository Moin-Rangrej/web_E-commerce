import React from 'react'
import Store from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const state = useSelector((state) => state.HandleCart)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light py-3 shadow-sm" style={{backgroundColor: 'whitesmoke'}}>
                <div className="container">

                    <NavLink className="navbar-brand storeNav" to="/">
                        <img src={Store} alt='Store logo' className='img-thumbnail storeLogo'/>
                        My Store</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" to="#">Action</a></li>
                                    <li><a className="dropdown-item" to="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" to="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                            <div className='buttons'>
                                    <NavLink to='/login' className='btn btn-outline-dark'>
                                        <i className='fa fa-sign-in ms-1'> Login </i>
                                    </NavLink>
                                    <NavLink to='/register' className='btn btn-outline-dark ms-2'>
                                        <i className='fa fa-sign-in ms-1'> Register </i>
                                    </NavLink>
                                    <NavLink to='/cart' className='btn btn-outline-dark ms-2' >
                                        <i className='fa fa-shopping-cart ms-1'> Cart ({state.length}) </i>
                                    </NavLink>
                            </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
