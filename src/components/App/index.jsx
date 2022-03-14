import './index.css';
import Aside from '../Aside';
import Content from '../Content';
import { Provider } from "react-redux";
import { store } from '../../store'


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Aside />
        <Content />
      </div>
    </Provider>
  );
}

export default App;
