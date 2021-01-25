import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Main from './components/blog/Main';
import WritePost from './components/blog/WritePost';
import Post from './components/blog/PostById';
//import data from './MOCK_DATA.json';
import LandingPage from './components/auth/Landing';
const axios = require('axios').default;

//const confirmedJSONString = JSON.stringify(data);
//const parsedData:IBlogPost[] = JSON.parse(confirmedJSONString);

export interface IBlogPost {
  blogID: number;
  title: string;
  author: string;
  previewtext?: string | null;
  fulltext?: string;
  date: string;
}

const tempFaves = [200, 3, 7];

function App() {
  const [blogData, setBlogData] = useState<IBlogPost[]>([]);
  const [list, setList] = useState<IBlogPost[]>(blogData);
  const [favorites, setFavorites] = useState<number[]>(tempFaves);

  useEffect(() => {
    // (async ():Promise<void> => {
    // try {
    //   const response = await axios.get('http://localhost:3001/blog');
    //   console.log(response.data);
    //   setBlogData(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    // })();
    axios.get('http://localhost:3001/blog')
      .then((response:any) => {
        setBlogData(response.data);
        console.log(response.data);
      }).catch((err:any) => console.error(err));
  }, []);  

  useEffect(() => {
    setList(blogData);
  },[blogData]);


  return (
    <Router>
      <Switch>
        <Route path='/landing' component={LandingPage} />
        <Route exact path='/main' render={() => <Main blogData={blogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/main/:blogID' render={() => <Post blogData={blogData} list={list} setList={setList} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path='/write' component={WritePost} />
        <Redirect to='/main' />
      </Switch>
    </Router>
  );
}

export default App;
