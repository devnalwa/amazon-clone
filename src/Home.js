import React from 'react'
import './Home.css'
import Product from "./Product"

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img
                    className="home_image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />


                <div className="home_row">
                    <Product
                        id='123312423'
                        title='The Lean Startup: How Constant Innovation Creates Radically Successful Business Paperback'
                        price={29.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
                        rating={4}
                    />
                    <Product
                        id='23123141'
                        title='Kobe Bryant Poster'
                        price={24.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/7188dZALtoL._AC_SY741_.jpg"
                        rating={5}
                    />

                </div>

                <div className="home_row">
                    <Product
                        id='237426178'
                        title='Travis Scott x Jordan 1 "Cactus Jack"'
                        price={999.99}
                        image="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F03%2Ftravis-scott-jordan-1-cactus-jack-2019-release-001-1.jpg?q=75&w=800&cbr=1&fit=max"
                        rating={5}
                    />
                    <Product
                        id='7317241'
                        title='New Apple Ipad Pro, (12.9 inch, Wi-Fi, 256GB) - Space Grey (4th Generation)'
                        price={749.99}
                        image="https://static.bhphoto.com/images/images2500x2500/1592330791_1568358.jpg"
                        rating={4}
                    />
                    <Product
                        id='81278371'
                        title='Lebron James Signed Miami Heat White Jersey (2012-2013)'
                        price={4499.99}
                        image="https://www.grandstandsports.com/images/48423.jpg"
                        rating={5}
                    />

                </div>

                <div className="home_row">
                    <Product
                        id='38849412'
                        title='Adult Sueded Corduroy Bean Bag (Navy Blue)'
                        price={119.49}
                        image="https://ak1.ostkcdn.com/images/products/1039785/Gold-Medal-Adult-Sueded-Corduroy-Bean-Bag-Chair-ece68c3d-fcbe-43a9-b13a-84bd196f2b5f.jpg"
                        rating={2}
                    />
                </div>


            </div>
        </div>
    )
}

export default Home;
