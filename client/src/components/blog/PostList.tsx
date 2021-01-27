import React, { ReactElement, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Container, CardText, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IBlogPost } from '../../App';
import FavoriteIcon from './FavoriteIcon';
import TrashIcon from './TrashIcon';
import { IMainProps } from './Main'
import { IMyPosts } from '../../App';
import EditButton from './EditButton';


export const dateSwitcharoo = (date:string):string => {
    let justDate = date.slice(0,10);
    return justDate.slice(5) + '-' + justDate.slice(0,4);
}

const PostList = ({ blogData, favorites, setFavorites, list, setList, userPosts, setCurrentToEdit }: IMainProps) => {
    
    // Use boolean to show user "no results" response when their search is unmatched
    let noResults:boolean = blogData.length > 0 ? false : true;
    let dateString:string;

    //add loader
    return (
        <Container>
        {!noResults ? blogData.map((post:IBlogPost, i:number): ReactElement => {
            dateString = dateSwitcharoo(post.date);
            return (
                <Card key={post.blogID}>
                    <CardBody>
                        <CardTitle tag='h5'><Link to={`/main/blog/${post.blogID}`} data-alt={`Link to ${post.title}`}>{post.title}</Link></CardTitle>
                        <CardSubtitle tag='h6'>Written by {post.author}</CardSubtitle>
                        <CardText>{dateString}</CardText>
                        <Row>
                        <Col className='col-11'>
                            {post.previewtext && <CardText>{post.previewtext}</CardText>}
                        </Col>
                        <Col>
                            <FavoriteIcon post={post} favorites={favorites} setFavorites={setFavorites}/>
                        </Col>    
                            {userPosts.some((userPost:IMyPosts) => userPost.blogID === post.blogID) && 
                                <Col>
                                    <TrashIcon post={post} list={list} setList={setList}/>
                                    <EditButton post={post} setCurrentToEdit={setCurrentToEdit}/>
                                </Col>
                            }
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