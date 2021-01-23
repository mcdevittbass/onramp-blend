import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardBody} from 'reactstrap';
import { Header, IBlogPost } from './Main';
import { dateSwitcharoo } from './PostList';

type TPostProps = { blogData: IBlogPost[]}
type TParam = { blogId: string };

const Post = ({ blogData }:TPostProps) => {

    const { blogId }:TParam = useParams();

    //an array with one object in it (blogIds must be unique)
    const currentBlog:IBlogPost[] = blogData.filter((blog: IBlogPost) => {
        let blogNumId = parseInt(blogId);
        return blog.blogId == blogNumId;
    });


    return (
        <>
            <Header />
            <Card>
                <CardBody>
                    <CardTitle tag='h4'>{currentBlog[0].title}</CardTitle>
                    <CardSubtitle tag='h5'>Written by {currentBlog[0].author}</CardSubtitle>
                    <CardText>{dateSwitcharoo(currentBlog[0].date)}</CardText>
                    <CardText>{currentBlog[0].fullText}</CardText>
                </CardBody>
            </Card>
        </>
    )
}

export default Post;