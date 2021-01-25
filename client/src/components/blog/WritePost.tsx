import React, { useState, ChangeEvent } from 'react';
import { Form, Row, Col, Label, Input, FormGroup, Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Header } from './Main';
import ReturnHome from './ReturnHome';
import { IBlogPost } from '../../App';

const WritePost = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newFullText, setNewFullText] = useState('');
    const [newPreviewText, setNewPreviewText] = useState('');
    const [newDate, setNewDate] = useState('');

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
            case 'date':
                setNewDate(e.target.value);
                break;
        }
    }

    const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //make a post request to the backend, add to database
        const newPost:IBlogPost = {
            //figure out generating id
            blogId: 1,
            title: newTitle,
            author: newAuthor,
            previewText: newPreviewText,
            fullText: newFullText,
            favorite: false,
            date: ''
        }
        console.log(newPost);
        clearForm();
    }

    const clearForm = () => {
        setNewTitle('');
        setNewAuthor('');
        setNewFullText('');
        setNewPreviewText('');
        setNewDate('');
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
                        <FormGroup className='w-50'>
                            <Label for="date">Date</Label>
                            <Input type="date" name="date" id="date" rows='20' 
                                value={newDate} 
                                onChange={(e) => handleChangeInput(e)}/>
                        </FormGroup>
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