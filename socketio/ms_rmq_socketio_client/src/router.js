import { createBrowserRouter } from "react-router-dom";
import App from 'src/App'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Room from 'src/pages/Room'
import Meeting from "src/pages/Meeting";

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
                path: "/meeting",
                element: <Meeting />
            },
            {
                path: "/room/:roomId",
                element: <Room />
            },
        ]
    },
]);

export default router;