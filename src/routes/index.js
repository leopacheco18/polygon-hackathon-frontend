/* All pages */
import HomeUser from "../pages/homeUser/HomeUser"
import Foundations from "../pages/foundations/Foundations";

/* Importing the icons from the react-icons library. */
import {
    AiFillHome,
    AiOutlineFileAdd,
    AiOutlineFontColors,
    AiOutlineToTop,
} from "react-icons/ai";

/* Creating an array of objects. Each object has a path, title, component, and icon. */
const authProtectedRoutes = [
    { path: '/', title: 'Home', component: <Foundations />, icon: <AiFillHome />, exact: true },
    { path: '/foundations', title: 'Foundations', component: <Foundations />, icon: <AiOutlineFontColors /> },
    { path: '/top-contributors', title: 'Top Contributors', component: <HomeUser />, icon: <AiOutlineToTop /> },
    { path: '/register-foundation', title: 'Register your foundation', component: <HomeUser />, icon: <AiOutlineFileAdd /> }
]

/* Exporting the array of objects. */
export default authProtectedRoutes
