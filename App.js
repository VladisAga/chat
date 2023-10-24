import { Provider } from 'react-redux';
import { View } from 'react-native';
import ReactDOM from 'react-dom/client';
import Appp from './src/components/App/App';
import { store } from './src/redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <Appp />
    </Provider>
  );
}

export default App;