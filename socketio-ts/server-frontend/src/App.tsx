import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/admin-panel';
import Dashborad from '@/modules/dashboard';
import Login from '@/modules/accesscontrol/login';
import ForgotPassword from '@/modules/accesscontrol/forgot-password';
import ForgotPasswordCodeVerify from '@/modules/accesscontrol/forgot-password-code-verify';
import PasswordReset from '@/modules/accesscontrol/password-reset';

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='dashboard' element={<Dashborad/>} />
                </Route>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
                <Route path='/forgot-password-code-verify' element={<ForgotPasswordCodeVerify/>}></Route>
                <Route path='/password-reset' element={<PasswordReset/>}></Route>
            </Routes>
        </Router>
    )
}

export default App
