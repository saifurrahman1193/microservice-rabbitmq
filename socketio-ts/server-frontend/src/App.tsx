import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/admin-panel';
import Dashborad from '@/modules/dashboard';
import Login from '@/modules/accesscontrol/login';
import ForgotPassword from '@/modules/accesscontrol/forgot-password';
import ForgotPasswordCodeVerify from '@/modules/accesscontrol/forgot-password-code-verify';
import PasswordReset from '@/modules/accesscontrol/password-reset';
import ClientApp from '@/modules/client_app';
import Room from '@/modules/room';
import Server from '@/modules/server';
import Event from '@/modules/event';
import Socket from '@/modules/socket';
import AppAccessToken from '@/modules/app_access_token';
import Log from '@/modules/log';
import 'flowbite';
import User from './modules/user';
import Role from './modules/role';
import Permission from './modules/permission';

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/admin' element={<AdminLayout />}>
                    <Route path='dashboard' element={<Dashborad />} />
                    <Route path='client-app' element={<ClientApp />} />
                    <Route path='room' element={<Room />} />
                    <Route path='event' element={<Event />} />
                    <Route path='server' element={<Server />} />
                    <Route path='socket' element={<Socket />} />
                    <Route path='log' element={<Log />} />
                    <Route path='access-control' >
                        <Route path='user' element={<User />} />
                        <Route path='role' element={<Role />} />
                        <Route path='permission' element={<Permission />} />
                        <Route path='access-token' element={<AppAccessToken />} />
                    </Route>
                </Route>
                <Route path='/' element={<Login />}></Route>
                <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                <Route path='/forgot-password-code-verify' element={<ForgotPasswordCodeVerify />}></Route>
                <Route path='/password-reset' element={<PasswordReset />}></Route>
            </Routes>
        </Router>
    )
}

export default App
