import { RouterProvider } from 'react-router-dom';
import { useAuthListener } from './hooks/useAuthListener';
import { router } from './router';

function App() {
    useAuthListener();

    return <RouterProvider router={router} />;
}

export default App;