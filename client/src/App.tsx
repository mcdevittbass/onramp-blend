import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Main from './components/blog/Main';
import WritePost from './components/blog/WritePost';
import Post from './components/blog/PostById';
//import data from './MOCK_DATA.json';
import LandingPage from './components/auth/Landing';

export interface IBlogPost {
  blogID: number;
  title: string;
  author: string;
  previewtext?: string | null;
  fulltext?: string;
  date: string;
}

export interface IMyPosts {
  blogID: number,
  userID: number
}

function App() {
  const [blogData, setBlogData] = useState<IBlogPost[]>([]);
  const [list, setList] = useState<IBlogPost[]>(blogData);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userPosts, setUserPosts] = useState<IMyPosts[]>([]);
  const [currentToEdit, setCurrentToEdit] = useState<IBlogPost | null>(null);

 
  return (
    <Router>
      <Switch>
        <Route path='/landing' render={() => <LandingPage setFavorites={setFavorites} setUserPosts={setUserPosts}/>} />
        <Route exact path='/main' render={() => <Main blogData={blogData} setBlogData={setBlogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} userPosts={userPosts} setUserPosts={setUserPosts} setCurrentToEdit={setCurrentToEdit}/>} />
        <Route exact path='/main/blog/:blogID' render={() => blogData.length ? <Post blogData={blogData} setBlogData={setBlogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} userPosts={userPosts} setUserPosts={setUserPosts} setCurrentToEdit={setCurrentToEdit} /> : <div><h4>Couldn't get post data</h4></div>} />
        <Route exact path='/main/write' render={ () =>  <WritePost currentToEdit={currentToEdit} setCurrentToEdit={setCurrentToEdit}/>} />
        <Redirect to='/landing' />
      </Switch>
    </Router>
  );
}

export default App;
