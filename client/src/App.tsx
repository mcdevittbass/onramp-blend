import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Main from './components/blog/Main';
import WritePost from './components/blog/WritePost';
import Post from './components/blog/PostById';
import data from './MOCK_DATA.json';
import LandingPage from './components/auth/Landing';

const confirmedJSONString = JSON.stringify(data);
const parsedData:IBlogPost[] = JSON.parse(confirmedJSONString);

export interface IBlogPost {
  blogId: number;
  title: string;
  author: string;
  previewText?: string | null;
  fullText?: string;
  favorite: boolean;
  date: string;
}


function App() {
  const [blogData, setBlogData] = useState<IBlogPost[]>(parsedData);
  const [list, setList] = useState<IBlogPost[]>(blogData);
  const [favorites, setFavorites] = useState<IBlogPost[]>(blogData.filter(post => post.favorite === true));

  return (
    <Router>
      <Switch>
        <Route path='/landing' component={LandingPage} />
        <Route exact path='/main' render={() => <Main blogData={blogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/main/:blogId' render={() => <Post blogData={blogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/write' component={WritePost} />
        <Redirect to='/main' />
      </Switch>
    </Router>
  );
}

export default App;
