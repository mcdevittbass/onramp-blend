import React, { useState, ChangeEvent, useEffect, SetStateAction } from 'react';
import { Form, Row, Col, Label, Input, FormGroup, Button, Card, CardBody, CardHeader } from 'reactstrap';
import Header from './Header';
import ReturnHome from './ReturnHome';
import axios from 'axios';
import { IBlogPost } from '../../App';

interface IBlogPostRequest {
    title: string;
    author: string;
    previewtext: string;
    fulltext: string;
    date: string;
    userID: number;
}
type TWriteProps = {currentToEdit:IBlogPost | null, setCurrentToEdit: (currentToEdit:SetStateAction<IBlogPost | null> )=>void;}
const WritePost = ({ currentToEdit, setCurrentToEdit }:TWriteProps) => {
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newFullText, setNewFullText] = useState('');
    const [newPreviewText, setNewPreviewText] = useState('');

    useEffect(() => {
        if(currentToEdit) {
            setNewTitle(currentToEdit.title);
            setNewAuthor(currentToEdit.author);
            if(currentToEdit.fulltext) setNewFullText(currentToEdit.fulltext);
            if(currentToEdit.previewtext) setNewPreviewText(currentToEdit.previewtext);
        } else {
            clearForm();
        }
        return () => setCurrentToEdit(null);
    }, [currentToEdit])

    const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case 'title':
                setNewTitle(e.target.value);
                break;
            case 'author':
                setNewAuthor(e.target.value);
                break;
            case 'newFullText':
                setNewFullText(e.target.value);
                break;
            case 'newPreviewText':
                setNewPreviewText(e.target.value);
                break;
        }
    }

    const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //use axios to add this post to the blogposts table of the database
        //as well as the user_blog_relationship table associated with the current user
        let today = new Date().toJSON().slice(0,10);
        const userStringID = localStorage.getItem('user');
        const userID = userStringID ? parseInt(userStringID) : 0;
        const newPost:IBlogPostRequest = {
            title: newTitle,
            author: newAuthor,
            previewtext: newPreviewText,
            fulltext: newFullText,
            date: today,
            userID: userID
        }
        // if null was passed as currentToEdit, this is a new blog post, and a post request is made
        if(!currentToEdit) {
            try {
                const response = await axios({
                    method: 'post',
                    url: `http://localhost:3001/blog`,
                    data: newPost,
                    headers: {"Authorization" : localStorage.getItem('jwt')}
                });
                console.log(response);
                //add code to let user know a post has been created
                } catch (err) {
                    console.error(err);
                }
        } // if a blog post object was passed as currentToEdit, this blog post is being updated and a put request is made
        else {
            try {
                const response = await axios({
                    method: 'put',
                    url: `http://localhost:3001/blog`,
                    data: { 
                        ...newPost,
                        blogID: currentToEdit.blogID
                    },
                    headers: {"Authorization" : localStorage.getItem('jwt')}
                });
                console.log(response);
                //add code to let user know a post has been updated
            } catch (err) {
                console.error(err);
            }
        }
        setCurrentToEdit(null);
        clearForm();
    }

    const clearForm = () => {
        setNewTitle('');
        setNewAuthor('');
        setNewFullText('');
        setNewPreviewText('');
    }

    return (
        <>
            <Header />
            <Card className='m-4'>
                <CardHeader>
                    <h2>Create your own blog post</h2>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleAddPost}>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" 
                                    value={newTitle} 
                                    placeholder="Full Title" 
                                    onChange={(e) => handleChangeInput(e)} />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input type="text" name="author" id="author" 
                                    value={newAuthor} 
                                    placeholder=" Author's First and Last Name" 
                                    onChange={(e) => handleChangeInput(e)}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                        <FormGroup className='w-100'>
                            <Label for="newFullText">Content</Label>
                            <Input type="textarea" name="newFullText" id="newFullText" rows='20' 
                                value={newFullText}
                                placeholder="Write your blog post here..." 
                                onChange={(e) => handleChangeInput(e)}/>
                        </FormGroup>
                        </Row>
                        <Row form>
                        <FormGroup className='w-100'>
                            <Label for="newPreviewText">Content</Label>
                            <Input type="textarea" name="newPreviewText" id="newPreviewText" rows='5' 
                                value={newPreviewText}
                                placeholder="Optional: add preview text to peak readers' interest." 
                                onChange={(e) => handleChangeInput(e)}/>
                        </FormGroup>
                        </Row>
                        <Row className='justify-content-end'>
                            <Col className='col col-md-3'>
                                <Button type='reset' className='m-1' onClick={clearForm} >Clear form</Button>
                                <Button type='submit' className='m-1'>Submit post</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            <ReturnHome />
        </>
    )
}

export default WritePost;