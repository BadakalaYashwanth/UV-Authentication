import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import './home.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const hasFetched = useRef(false);
    const navigate = useNavigate();

    const imageFallbacks = {
        "Google Pixel 10 Pro": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
        "Apple iPhone 15 Pro Max": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
        "Samsung Galaxy S24 Ultra": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
        "Acer Nitro 5": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=80",
        "Dell Vostro 3400": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
        "Lenovo ThinkPad X1 Carbon": "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
        "HP EliteBook 840 G9": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=80",
        "Asus ZenBook 14": "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=900&q=80",
        "Microsoft Surface Laptop 4": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=80",
        "Razer Blade 15": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80",
        "Canon EOS R5": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        "Nikon D850": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=900&q=80",
        "Sony Alpha 7 III": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=900&q=80",
        "Fujifilm X-T4": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
        "Leica Q2": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
        "Sony TV": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
        "LG TV": "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=900&q=80",
        "Samsung TV": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80",
        "Toshiba TV": "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80",
        "Panasonic TV": "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=900&q=80",
        "Titan Watch": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
        "Rolex Watch": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80",
        "Omega Watch": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80"
    };
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const url = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/products`;
            const headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            if (!response.ok) {
                handleError(result?.message || 'Unable to fetch products');
                if (response.status === 401 || response.status === 403) {
                    setTimeout(() => navigate('/login'), 1000);
                }
                setProducts([]);
                return;
            }

            // API may return either an array directly or wrapped in an object.
            const productList = Array.isArray(result)
                ? result
                : Array.isArray(result?.data)
                    ? result.data
                    : [];

            setProducts(productList);
        } catch (err) {
            handleError(err?.message || 'Something went wrong');
            setProducts([]);
        }
    }, [navigate])
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchProducts()
    }, [fetchProducts])

    return (
        <div className='home-page'>
            <header className='home-header'>
                <div>
                    <p className='home-subtitle'>Product Dashboard</p>
                    <h1>Welcome {loggedInUser || "User"}</h1>
                </div>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </header>

            <section className='product-grid'>
                {products.map((item, index) => (
                    <article className='product-card' key={`${item.name}-${index}`}>
                        <img
                            src={imageFallbacks[item.name] || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=900&q=80"}
                            alt={item.name}
                            loading='lazy'
                        />
                        <div className='product-info'>
                            <h3>{item.name}</h3>
                            <p>INR {Number(item.price || 0).toLocaleString("en-IN")}</p>
                        </div>
                    </article>
                ))}
            </section>

            {!products.length && (
                <p className='empty-products'>No products available right now.</p>
            )}

            <div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Home