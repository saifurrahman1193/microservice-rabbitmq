import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/header';
import SideBar from '@/components/sidebar';
import Footer from '@/components/footer';

type Props = {}

const AdminLayout = (props: Props) => {

    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        console.log(showSidebar);
    };
    return (
        <>
            <Header />
            <SideBar />
            {<Outlet/>}
            {/* <Footer />  */}
        </>
    )
}
export default AdminLayout;
