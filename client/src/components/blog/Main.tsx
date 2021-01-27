import React, { SetStateAction, useEffect } from 'react';
import { Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import PostList from './PostList';
import FavoriteCheckBox from './FavoriteCheckBox';
import WriteButton from './WriteButton';
import { IBlogPost, IMyPosts } from '../../App';
import Header from './Header';
import axios from 'axios';

export interface IMainProps { 
    blogData: IBlogPost[]; 
    setBlogData: (blogData:SetStateAction<IBlogPost[]>)=>void;
    favorites: number[];
    setFavorites: (favorites:SetStateAction<number[]>)=>void;
    list: IBlogPost[];
    setList: (list:SetStateAction<IBlogPost[]>)=>void;
    userPosts: IMyPosts[];
    setUserPosts: (userPosts:SetStateAction<IMyPosts[]>)=>void;
    setCurrentToEdit: (currentToEdit:SetStateAction<IBlogPost | null> )=>void;
}

const Main = ({ blogData, setBlogData, list, setList, favorites, setFavorites, userPosts, setUserPosts, setCurrentToEdit }: IMainProps) => {
    const history = useHistory();

    useEffect(() => {
        const currentToken = localStorage.getItem('jwt');
        const user = localStorage.getItem('user');
        if(!currentToken) {
          alert("Your session may have expired. Please sign in again!")
          history.push('/landing');
          return;
        }
        (async () => {
          try {
            const response = await axios({
              method: 'get',
              url: 'http://localhost:3001/blog',
              headers: {"Authorization" : currentToken}
            })
            if(response.status === 200) {
              setBlogData(response.data);
              try {
                const userResponse = await axios({
                    method: 'get',
                    url: `http://localhost:3001/user/info/${user}`,
                    headers: {"Authorization" : currentToken}
                  })
                
                  if(userResponse.status === 200) {
                    setUserPosts(userResponse.data);
                  } else{
                      console.log(userResponse);
                      history.push('/landing')
                  }
              } catch(err:any){
                console.error(err);
                history.push('/landing')
              }
            } else {
                console.log(response);
                alert("Your session may have expired. Please sign in again!")
                history.push('/landing');
            }
          } catch (err:any) {
                console.error("There was an error getting blog posts!")
                history.push('/landing');
            }
        })();
          
        // get favorites array from users table
        //   (async () => {
        //     try{
        //       const response = await axios({
        //         method: 'get',
        //         url: `http://localhost:3001/user/favorites/${user}`,
        //         headers: {"Authorization" : currentToken}
        //       });
        //       if(response.status === 200) {
        //         console.log(response)
        //         const faves = response.data.favorites;
        //         setFavorites(faves);
        //       } else if(response.status === 401) {
        //         alert("Your session may have timed out. Please sign in again!")
        //         history.push('/landing')
        //       }
        //     }
        //     catch(err) {
        //       console.error(err);
        //     }
        // })();
      }, []); 

      useEffect(() => {
        setList(blogData);
      },[blogData]);

    return (
        <>
            <Header />
            <Row className='align-items-center'>
                <Search blogData={blogData} setList={setList}/>
                <FavoriteCheckBox blogData={blogData} setList={setList} favorites={favorites}/>
                <WriteButton />
            </Row>
            <Row>
                <PostList blogData={list} 
                    setBlogData={setBlogData}
                    favorites={favorites} 
                    setFavorites={setFavorites} 
                    list={list} 
                    setList={setList}
                    userPosts={userPosts}
                    setUserPosts={setUserPosts}
                    setCurrentToEdit={setCurrentToEdit}
                    />
            </Row>
        </>
    )
}

export default Main;