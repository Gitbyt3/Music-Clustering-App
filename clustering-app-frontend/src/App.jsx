import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import Intro from './pages/Intro'
import MainApp from './pages/MainApp'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Intro />} />
        <Route path='MainApp' element={<MainApp />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
};

export default App