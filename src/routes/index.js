/* All pages */
import HomeUser from "../pages/homeUser/HomeUser"
import Foundations from "../pages/foundations/Foundations";
import DetailsNft from "../pages/detailsNft/DetailsNft";

/* Importing the icons from the react-icons library. */
import {
    AiFillHome
} from "react-icons/ai";

import { RiHandHeartFill } from "react-icons/ri";


import FoundationDetails from "../pages/foundation-details/FoundationDetails";
import Profile from "../pages/profile/Profile";

/* Creating an array of objects. Each object has a path, title, component, and icon. */
const authProtectedRoutes = [
    { path: '/', title: 'Home', component: <HomeUser />, icon: <AiFillHome />, exact: true, isAvailableInMenu: true },
    { path: '/profile', title: 'Profile', component: <Profile />, icon: <AiFillHome />, exact: true, isAvailableInMenu: false },
    { path: '/foundations', title: 'Foundations', component: <Foundations />, icon: <RiHandHeartFill />, isAvailableInMenu: true },
    { path: '/details-nft/:address/:tokenId', title: 'Details NFT', component: <DetailsNft />, icon: null, isAvailableInMenu: false },
    { path: '/foundation-details/:address', title: 'Foundation Details', component: <FoundationDetails />, icon: null, isAvailableInMenu: false }
]


/* Exporting the array of objects. */
export default authProtectedRoutes
