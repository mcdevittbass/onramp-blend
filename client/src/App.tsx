import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './components/blog/Main';
import WritePost from './components/blog/WritePost';
import Post from './components/blog/PostById';
import blogData from './MOCK_DATA.json';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/main' component={Main} />
        <Route path='/main/:blogId' render={() => <Post blogData={blogData} />} />
        <Route path='/write' component={WritePost} />
        <Redirect to='/main' />
      </Switch>
    </Router>
  );
}

export default App;
