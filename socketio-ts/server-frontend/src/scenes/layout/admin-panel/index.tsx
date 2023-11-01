import React from 'react'
import { Outlet } from 'react-router-dom';

type Props = {}

const AdminLayout = (props: Props) => {
    return (
        <>
            <div>Sidebar</div>
            <div>Header</div>
            <div>{<Outlet/>}</div>
        </>
    )
}
export default AdminLayout;
