import {createBrowserRouter, Navigate} from "react-router-dom";

import MainLayout from "./layouts/MainLayout.tsx";
import UserPage from "./pages/UserPage.tsx";
import TodosPage from "./pages/TodosPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";


const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={"todos"}/>,
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "user",
                element: (
                    <ProtectedRoute>
                        <UserPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "todos",
                element: (
                    <ProtectedRoute>
                        <TodosPage/>
                    </ProtectedRoute>),
            },
            {
                path: '*',
                element: <Navigate to="/todos" replace />
            }
        ],
    },
]);

export {router};