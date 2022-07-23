import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, BrowserRouter, Switch } from "react-router-dom";

import AboutAs from "../../components/foundation-details/AboutAs";
import Posts from "../../components/foundation-details/Posts";
import TextWithTopLine from "../../components/global/TextWithTopLine";

import './FoundationDetails.css'

import Logo1 from '../../assets/foundation/1.png'
import Logo2 from '../../assets/foundation/2.png'
import Logo3 from '../../assets/foundation/3.png'

const fou = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    cause: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem',
    location: 'Ecuador - Quito',
    email: 'waynermoya@hotmai.com',
    posts: [
        { img: Logo1, title: 'Purchase of Dog Food', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', date: 'July 20, 2022', },
        { img: Logo2, title: 'Purchase of Dog Food', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', date: 'July 20, 2022', },
        { img: Logo3, title: 'Purchase of Dog Food', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', date: 'July 20, 2022', },
    ]
};

const FoundationDetails = () => {

    const [foundation, setFoundation] = useState(null)

    useEffect(() => {
        // call to get all profile of foundation

        setFoundation(fou)

    }, [])

    return (
        <div className="container">
            Foundation Details sfsd


            <nav className="navbar-details-foundation" >

                <Link to="/">
                    <TextWithTopLine padding={'1rem 0'} fontSize="1.25rem" fontWeight={600} >About Us</TextWithTopLine>
                </Link>

            </nav>

            <Routes>
                <Route
                    key="1"
                    path="/foundation-details/:name/about-use"
                    element={<AboutAs foundation={foundation} />}
                />
                <Route
                    key="2"
                    path="/about-use2"
                    element={<AboutAs foundation={foundation} />}
                />
            </Routes>

            <AboutAs foundation={foundation} />

            {/** 
            <Posts foundation={foundation} />
*/}
        </div >
    )
}

export default FoundationDetails;