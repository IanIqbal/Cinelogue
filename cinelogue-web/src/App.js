import './App.css';
import router from './routers';
import store from './store';
import {Provider} from "react-redux"
import {RouterProvider} from "react-router-dom"

function App() {
  return (
    <Provider store={store} >
      <RouterProvider router={router} > 

      </RouterProvider>
    </Provider>
  );
}

export default App;
