import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '@/components/header';
import SideBar from '@/components/sidebar';
import Footer from '@/components/footer';

type Props = {}

const AdminLayout = (props: Props) => {
    return (
        <>
            <Header />
            <SideBar />
            {/* 
            <div>{<Outlet/>}</div>
            <Footer /> */}


            

        </>
    )
}
export default AdminLayout;
