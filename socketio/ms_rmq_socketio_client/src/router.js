import { createBrowserRouter } from "react-router-dom";
import App from 'src/App'
import Home from 'src/pages/Home'
import Chat from 'src/pages/Chat'
import Room from 'src/pages/Room'
import MeetingsManagement from "src/pages/MeetingsManagement";

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
                path: "/meetings-management",
                element: <MeetingsManagement />
            },
            {
                path: "/room/:roomId",
                element: <Room />
            },
        ]
    },
]);

export default router;