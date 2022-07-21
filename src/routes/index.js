/* All pages */
import HomeUser from "../pages/homeUser/HomeUser"
import Foundations from "../pages/foundations/Foundations";

/* Importing the icons from the react-icons library. */
import {
    AiFillHome,
    AiOutlineFontColors,
    AiOutlineToTop,
} from "react-icons/ai";

/* Creating an array of objects. Each object has a path, title, component, and icon. */
const authProtectedRoutes = [
    { path: '/', title: 'Home', component: <HomeUser />, icon: <AiFillHome />, exact: true },
    { path: '/foundations', title: 'Foundations', component: <Foundations />, icon: <AiOutlineFontColors /> },
    { path: '/top-contributors', title: 'Top Contributors', component: <></>, icon: <AiOutlineToTop /> }
]

/* Exporting the array of objects. */
export default authProtectedRoutes
