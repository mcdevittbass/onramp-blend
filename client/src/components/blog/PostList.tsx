import React, { ReactElement } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, Container, CardText } from 'reactstrap';
import { IBlogPost } from './Main';

type TProps = { blogData: IBlogPost[]; }

const PostList = ({ blogData }: TProps) => {

    const logProps = () => {
        console.log(blogData[0]);
    }

    let noResults:boolean = blogData.length > 0 ? false : true;

    return (
        <Container>
        {!noResults && blogData.map((post:IBlogPost, i:number): ReactElement => {
            return (
                <Card key={post.title + i}>
                    <CardBody>
                        <CardTitle tag='h5'><a href={`/main/${post.blogId.$oid}`}>{post.title}</a></CardTitle>
                        <CardSubtitle tag='h6'>Written by {post.author}</CardSubtitle>
                        <CardText>{post.previewText}</CardText>
                    </CardBody>
                </Card>
            )
        })}
        {noResults && <h3>No results found</h3>}
        </Container>
    )
}

export default PostList;