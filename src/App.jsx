import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/homepage'
import Userpage from './pages/user/user'
import Welcome from './pages/welcome/welcome'
import Root from './root/root'

function App() {
  const router = createBrowserRouter([
    {path:'/', element:<Root/>,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
      ],
    },
    {path:'/welcome',
      element:<Welcome/>
    },
    // user pages must be accessible even while not loged in for the owners' profile.
    {path:'/user/:username',
      element:<Userpage/>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
