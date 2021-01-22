import React, { ReactElement } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, Container, CardText } from 'reactstrap';
import { IBlogPost } from './Main';

type TProps = { blogData: IBlogPost[]; }

const PostList = ({ blogData }: TProps) => {

    const logProps = () => {
        console.log(blogData[0]);
    }

    return (
        <Container>
        {blogData.map((post:IBlogPost): ReactElement => {
            return (
                <Card>
                    <CardBody>
                        <CardTitle tag='h5'><a href={`/main/${post.blogId.$oid}`}>{post.title}</a></CardTitle>
                        <CardSubtitle tag='h6'>Written by {post.author}</CardSubtitle>
                        <CardText>{post.previewText}</CardText>
                    </CardBody>
                </Card>
            )
        })}
        </Container>
    )
}

export default PostList;