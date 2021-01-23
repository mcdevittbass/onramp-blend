import React, { MouseEvent, ReactElement, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, CardText, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { IBlogPost } from './Main';

export const dateSwitcharoo = (date:string):string => {
    return date.slice(5) + '-' + date.slice(0,4);
}

type TProps = { blogData: IBlogPost[]; }

const PostList = ({ blogData }: TProps) => {
    
    // Use boolean to show user 
    let noResults:boolean = blogData.length > 0 ? false : true;
    let dateString:string;

    const deletePost = (id:number):void => {
        console.log('Delete: ' + id);
    }

    const changeFavorites = (e:MouseEvent<SVGSVGElement>, post:IBlogPost):void => {
        //send put request to db to change favorite
        //figure out how to change icon on click without using state (too many re-renders)
        let updated = {...post, favorite: !post.favorite}

        console.log('Changed favorites: ') 
        console.log(updated);
    }

    return (
        <Container>
        {!noResults ? blogData.map((post:IBlogPost, i:number): ReactElement => {
            dateString = dateSwitcharoo(post.date);
            return (
                <Card key={post.title + post.author}>
                    <CardBody>
                        <CardTitle tag='h5'><a href={`/main/${post.blogId}`} data-alt={`Link to ${post.title}`}>{post.title}</a></CardTitle>
                        <CardSubtitle tag='h6'>Written by {post.author}</CardSubtitle>
                        <CardText>{dateString}</CardText>
                        <Row>
                        <Col className='col-11'>
                            {post.previewText && <CardText>{post.previewText}</CardText>}
                        </Col>
                        <Col>
                            <FontAwesomeIcon className='font-icon' icon={faTrashAlt} size="2x" title="Delete this post"
                                onClick={() => deletePost(post.blogId)}/>
                            <FontAwesomeIcon className='font-icon' icon={post.favorite ? fasFaHeart : farFaHeart} size="2x" title="Add to Favorites"
                                onClick={(e) => changeFavorites(e, post)}/>
                        </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        })
        : <h3>No results found</h3>}
        </Container>
    )
}

export default PostList;