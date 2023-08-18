import { createBrowserRouter } from "react-router-dom";
import App from 'src/App'
import Home from 'src/components/Home'
import ChatWindow from 'src/components/ChatWindow'

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
                element: <ChatWindow />
            }
        ]
    },
]);

export default router;