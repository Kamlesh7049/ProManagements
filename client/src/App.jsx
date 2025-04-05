import Layout from "./Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/AdminDashBoard";
import CreateUser from "./pages/Createuser";
import AssignTask from "./pages/AssignTask";
import UserDashBoard from "./pages/UserDashBoard";
import UserTaskDisplay from "./pages/UserTaskDisplay";
import UserTaskReport from "./pages/UserTaskReport";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./component/Footer";
const App=()=>{
    return(
        <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="dashboard" element={<DashBoard/>}> 
                <Route path="createuser" element={<CreateUser/>} />
                <Route path="assigntask" element={<AssignTask/>} />
                <Route path="usertaskreport" element={<UserTaskReport/>} />
            </Route>
            <Route path="userdashboard" element={<UserDashBoard/>} > 
            <Route path="usertaskdisplay" element={<UserTaskDisplay/>} /> 
            <Route path="resetpassword" element={<ResetPassword/>} > 
            </Route>
            
            </Route>
             </Route>
          </Routes>
          </BrowserRouter>
          <Footer/>
        </>
    )
}
export default App;