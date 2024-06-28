// import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

// import 'smart-webcomponents-react/source/styles/smart.default.css';
// import "./scss/global.scss"

function App() {

  const user = JSON.parse(localStorage.getItem('loggedInUser')) || [{ firstName: "" }];


  return (
    <>
      <RouterProvider router={router} user={user} />
    </>
  )
}

export default App;
