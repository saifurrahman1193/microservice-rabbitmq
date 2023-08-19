import { createBrowserRouter } from "react-router-dom";
import App from 'src/App'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Room from 'src/pages/Room'

const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/chat",
                element: <Chat />
            },
            {
                path: "/room/:roomId",
                element: <Room />
            },
        ]
    },
]);

export default router;