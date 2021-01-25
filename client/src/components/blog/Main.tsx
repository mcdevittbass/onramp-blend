import React, { SetStateAction, MouseEvent } from 'react';
import { Row, Button } from 'reactstrap';
import Search from './Search';
import PostList from './PostList';
import FavoriteCheckBox from './FavoriteCheckBox';
import WriteButton from './WriteButton';
import { IBlogPost } from '../../App';
import { useHistory } from 'react-router-dom';

export const Header = () => {

    const history = useHistory();

    const handleSignOut = (e: MouseEvent<HTMLButtonElement>): void => {
        console.log("clicked signout")
        //clear sessionStorage (or other JWT storage location?)
        
        history.push('/landing');
    }

    return (
        <Row id='header' className='m-2 p-3 justify-content-end'>
            <Button id='signout-button' onClick={handleSignOut}>Sign Out</Button>
        </Row>
    )
}

export interface IMainProps { 
    blogData: IBlogPost[]; 
    favorites: IBlogPost[];
    setFavorites: (favorites:SetStateAction<IBlogPost[]>)=>void;
    list: IBlogPost[];
    setList: (list:SetStateAction<IBlogPost[]>)=>void;
}

const Main = ({ blogData, list, setList, favorites, setFavorites }: IMainProps) => {

    return (
        <>
            <Header />
            <Row className='align-items-center'>
                <Search blogData={blogData} setList={setList}/>
                <FavoriteCheckBox blogData={blogData} setList={setList} favorites={favorites}/>
                <WriteButton />
            </Row>
            <Row>
                <PostList blogData={list} favorites={favorites} setFavorites={setFavorites} list={list} setList={setList}/>
            </Row>
        </>
    )
}

export default Main;