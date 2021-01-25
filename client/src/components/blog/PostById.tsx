import React, { SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardText, CardTitle, CardSubtitle, CardBody, Row, Col} from 'reactstrap';
import { Header } from './Main';
import { IBlogPost } from '../../App';
import { dateSwitcharoo } from './PostList';
import FavoriteIcon from './FavoriteIcon';
import TrashIcon from './TrashIcon';
import { IMainProps } from './Main';


type TParam = { blogID: string };

const Post = ({ blogData, list, setList, favorites, setFavorites }:IMainProps) => {

    const { blogID }:TParam = useParams();

    //an array with one object in it (blogIDs must be unique)
    const currentBlog:IBlogPost[] = blogData.filter((blog: IBlogPost) => {
        let blogNumId = parseInt(blogID);
        return blog.blogID == blogNumId;
    });
    const thisBlog = currentBlog[0];

    return (
        <>
            <Header />
            <Card>
                <CardBody>
                    <CardTitle tag='h4'>{thisBlog.title}</CardTitle>
                    <CardSubtitle tag='h5'>Written by {thisBlog.author}</CardSubtitle>
                    <Row className='justify-content-between'>
                        <CardText>{dateSwitcharoo(thisBlog.date)}</CardText>
                        <Col>
                            <FavoriteIcon post={thisBlog} favorites={favorites} setFavorites={setFavorites}/>
                            <TrashIcon post={thisBlog} list={list} setList={setList}/>
                        </Col>
                    </Row>
                    <CardText>{currentBlog[0].fulltext}</CardText>
                </CardBody>
            </Card>
        </>
    )
}

export default Post;