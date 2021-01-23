import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import Search from './Search';
import PostList from './PostList';
import FavoriteButton from './Favorites';
import WriteButton from './WriteButton';
import data from '../../MOCK_DATA.json';

export interface IBlogPost {
    blogId: number;
    title: string;
    author: string;
    previewText?: string | null;
    fullText?: string;
    favorite: boolean;
    date: string;
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
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [list, setList] = useState<IBlogPost[]>(blogData);


    //move this logic to PostList?
    useEffect(() => {
        switch(true) {
            // !! forces conversion to boolean
            case !!title:
                console.log(title)
                const titleFilter:IBlogPost[] = blogData.filter((blog:IBlogPost) => {
                    return blog.title.toLowerCase().includes(title.toLowerCase()); 
                });
                setList(titleFilter);
                break;
            case !!author:
                console.log(author);
                const authorFilter:IBlogPost[] = blogData.filter((blog:IBlogPost) => {
                    return blog.author.toLowerCase().includes(author.toLowerCase()); 
                });
                setList(authorFilter);
                break;
            default:
                setList(blogData);
        }
    }, [title, author, blogData]);

    return (
        <>
            <Header />
            <Row className='align-items-center'>
                <Search setTitle={setTitle} setAuthor={setAuthor}/>
                <FavoriteButton blogData={blogData} setList={setList}/>
                <WriteButton />
            </Row>
            <Row>
                <PostList blogData={list} />
            </Row>
        </>
    )
}

export default Main;