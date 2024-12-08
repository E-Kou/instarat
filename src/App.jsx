import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/homepage'
import Adduser from './pages/localtestsw/adduser'
import Search from './pages/search/search'
import Userpage from './pages/user/user'
import Welcome from './pages/welcome/welcome'
import Root from './root/root'
import SSizeContext from './utils/screenSize'

function App() {
  const router = createBrowserRouter([
    {path:'/', element:<Root/>,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {path:'/search',
          element:<Search/>
        }
      ],
    },
    {path:'/welcome',
      element:<Welcome/>
    },
    // user pages must be accessible even while not loged in for the owners' profile.
    {path:'/user/:username',
      element:<Root focreLogin={false}><Userpage/></Root>
    },
    {path:'/testing',
      element:<Adduser/>
    }
  ])

    const [width, setWidth] = useState(null);
    const [loggedIn, setLoggedIn] = useState(null);
    function reloadWidth(){
      setWidth(window.innerWidth)
    }
    function reloadLoginState(){
      setLoggedIn(!!localStorage.getItem("connectedAs"))
    }
    useEffect(()=>{
      reloadWidth();
      reloadLoginState();
      window.addEventListener('resize',reloadWidth)
      window.addEventListener('storage',reloadLoginState)
      return()=>{
        window.removeEventListener('resize',reloadWidth);
        window.removeEventListener('storage',reloadLoginState);
      }
    },[])
  

  return (
    <>
    <SSizeContext.Provider value={{width,loggedIn}}>
      <RouterProvider router={router} />
      </SSizeContext.Provider>
    </>
  )
}

export default App
