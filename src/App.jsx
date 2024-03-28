import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Start from "./Components/Start/Start.jsx";
import OnePlayer from "./Components/OnePlayer/OnePlayer";
import TwoPlayers from "./Components/TwoPlayers/TwoPlayers";
import Layout from "./Components/Layout/Layout.jsx";


export default function App() {
  
 let routes = createHashRouter([
    {path: '', element: <Layout/>, children: [
    {index: true, element: <Start/>},
    {path: '/one', element: <OnePlayer/>},
    {path: '/two', element: <TwoPlayers/>}
  ] }
 ])
  
  return <>
  
   <RouterProvider router={routes}></RouterProvider>

  </>
}
