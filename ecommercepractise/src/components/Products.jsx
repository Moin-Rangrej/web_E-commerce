import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/actions';

export default function Products() {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    let componentMounted = true;

    const dispatch = useDispatch()

    const addProduct = (product) => {
        dispatch(addCart(product))
    }




    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products')
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                // console.log(filter);
            }


            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, [])

    const Loading = () => {
        return (
            <>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
            </>
        )
    }
    const filterProduct = (cat) => {
        const ProductList = data.filter((items) => items.category === cat)
        // console.log(ProductList);
        setFilter(ProductList)
    }

   

   
        const productItem = async (id) => {
            console.log(id);
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json())
            setLoading(false)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }

       



    // console.log(product);


    const Showproduct = () => {
        return (
            <>
                <div className='d-flex justify-content-center flex-wrap'>
                    <button className='btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className='btn btn-outline-dark me-2' onClick={() => filterProduct("electronics")}>Electronics</button>
                </div>
                {
                    filter.map((product) => {

                        const ProductTitle = product.title.substring(0, 15)

                        return (
                            <div className='col-md-4 p-1 h-100 ' key={product.id}>
                                <div className="card h-100 text-center mt-5 img-thumbnail" style={{ width: "18rem" }}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    <div className="card-body">
                                        <h5 className="card-title">{ProductTitle.length >= 15 ? `${ProductTitle}...` : ProductTitle}</h5>
                                        <p className="card-text lead fw-bold"><span>&#36;</span>{product.price}</p>
                                        <div className='d-flex justify-content-center'>
                                            {/* <NavLink href="#" className="btn btn-primary me-2" to={`/products/${product.id}`}>Buy Now</NavLink> */}
                                            {/* <NavLink type="button" className="btn btn-primary" to={`/products/${product.id}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Buy Now
                                            </NavLink> */}
                                            <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => productItem(product.id)}>Buy Now</button>
                                            <a href="#" className="btn btn-success">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </>
        )
    }

    return (
        <>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <Showproduct />}
                </div>
                <>{ /* Modal */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className='col-md-6 productImgdiv'>
                                        <img src={product.image} alt={product.title} className='productImg'/>
                                    </div>
                                    <div className='col-md-6 productInfo'>
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
                                </div>
                            </div>
                        </div>
                    </div></>
            </div>
        </>
    )
}
