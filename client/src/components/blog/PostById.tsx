import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardBody, Row, Col} from 'reactstrap';
import Header from './Header';
import { IBlogPost } from '../../App';
import { dateSwitcharoo } from './PostList';
import FavoriteIcon from './FavoriteIcon';
import TrashIcon from './TrashIcon';
import ReturnHome from './ReturnHome';
import EditButton from './EditButton';
import { IMainProps } from './Main';
import { IMyPosts } from '../../App'


type TParam = { blogID: string };

const Post = ({ blogData, list, setList, favorites, setFavorites, userPosts, setCurrentToEdit }:IMainProps) => {
    const { blogID }:TParam = useParams();

    const [thisBlog, setThisBlog] = useState<IBlogPost>(currentBlog(blogID));
    
    // returns an array with one object in it (blogIDs must be unique)
    function currentBlog (blogID: string):IBlogPost {
            console.log(blogID)
            let blogArr = blogData.filter((blog: IBlogPost) => {
            let blogNumId = parseInt(blogID);
            return blog.blogID == blogNumId;
        })
        return blogArr[0];
    };

    // useEffect(() => {
    //     setThisBlog(currentBlog(blogID));
    // }, [blogData])
    

    return (
        <>
            <Header />
            {blogData.length ?
            <Card className='m-3'>
                <CardBody>
                    <CardTitle tag='h4'>{thisBlog.title}</CardTitle>
                    <CardSubtitle tag='h5'>Written by {thisBlog.author}</CardSubtitle>
                    <Row className='justify-content-between'>
                        <Col>
                            <CardText>{dateSwitcharoo(thisBlog.date)}</CardText>
                        </Col>
                    </Row>
                    <CardText>{thisBlog.fulltext}</CardText>
                    <Row className='justify-items-between'>
                        <Col>
                            <FavoriteIcon post={thisBlog} favorites={favorites} setFavorites={setFavorites}/>
                        </Col>
                            {userPosts.some((userPost:IMyPosts) => userPost.blogID === thisBlog.blogID) && 
                                <Col>
                                    <TrashIcon post={thisBlog} list={list} setList={setList}/>
                                    <EditButton post={thisBlog} setCurrentToEdit={setCurrentToEdit}/>
                                </Col>
                            } 
                    </Row>
                </CardBody>
            </Card>
            : <p>Waiting for post</p>}
            <ReturnHome />
        </>
    )
}

export default Post;