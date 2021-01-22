import React, { useState } from 'react';
import { Row, Button, Col } from 'reactstrap';
import Search from './Search';
import PostList from './PostList';
import FavoriteButton from './Favorites';
import WriteButton from './WriteButton';
import data from '../../MOCK_DATA.json';

export interface IBlogPost {
    blogId: {$oid: string};
    title: string;
    author: string;
    previewText?: string;
    fullText?: string;
    favorite: boolean;
}

export const Header = () => {
    const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>): void => {
        console.log("clicked signout")
    }

    return (
        <Row id='header' className='m-2 p-3 justify-content-end'>
            <Button id='signout-button' onClick={handleSignOut}>Sign Out</Button>
        </Row>
    )
}

const Main = () => {
    const [blogData, setBlogData] = useState<IBlogPost[]>(data);

    return (
        <>
            <Header />
            <Row className='align-items-center'>
                <Search />
                <FavoriteButton />
                <WriteButton />
            </Row>
            <Row>
                <PostList blogData={blogData} />
            </Row>
        </>
    )
}

export default Main;