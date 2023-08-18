import { Outlet } from 'react-router-dom';
import Header from 'src/components/layouts/Header';
import ChatWindow from 'src/components/ChatWindow';

function App() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
