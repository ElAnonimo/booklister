import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import BookList from './BookList';
import Book from './Book';
import AddBook from './AddBook';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<div className='booklister-app'>
							<div className='container'>
								<Switch>
									<Route exact path='/' component={BookList} />
									<Route path='/book/:book_id' component={Book} />
									<Route path='/addbook' component={AddBook} />
								</Switch>
							</div>
						</div>
					</BrowserRouter>
				</PersistGate>
      </Provider>
    );
  }
}

export default App;
