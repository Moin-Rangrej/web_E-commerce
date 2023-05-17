import React, { useState, useEffect } from 'react'
// import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { addCart } from '../redux/actions';


export default function Productmodal() {


    const { id } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const addProduct = (product) => {
        dispatch(addCart(product))
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json())
            setLoading(false)
        }
        getProduct()
    }, [])

    const Loading = () => {
        return (
            <>
                Loading....
            </>
        )
    }


    const Showproduct = () => {
        return (
            <div>
                <>{ /* Button trigger modal */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>

                    { /* Modal */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className='col-md-6'>
                                        <img src={product.image} alt={product.title} height='400px' width='400px' />
                                    </div>
                                    <div className='col-md-6'>
                                        <h4 className='text-uppercase text-black-50'>
                                            {product.category}
                                        </h4>
                                        <h1 className='display-5'>{product.title}</h1>
                                        <p className='lead fw-bolder'>
                                            Rating {product.rating && product.rating.rate}
                                        </p>
                                        <h3 className='display-6 fw-bold my-4'>
                                            ${product.price}
                                        </h3>
                                        <p className='lead'>{product.description}</p>
                                        <button className='btn btn-outline-dark px-4 py-2' onClick={() => addProduct(product)}>
                                            Add to Cart
                                        </button>
                                        <NavLink to='/cart' className="btn btn-dark ms-2 px-3 py-2">
                                            Go to Cart
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div></>
            </div>
        )
    }

    return (
        <>
            <div className='container py-5'>
                <div className='row py-4' >
                    {loading ? <Loading /> : <Showproduct />}
                </div>
            </div>
        </>
    )
}




