import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, FormGroup, Label } from 'reactstrap';

const Search = (props: any) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        e.preventDefault();
        if(e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if(e.target.name == 'author') {
            setAuthor(e.target.value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        //make a get request where title=(input) or author=(input)
        //add error handling for inputs that don't yield anything

        setTitle('');
        setAuthor('');
        console.log(e.target);
    }

    return (
        <Col>
            <Form className='m-4 p-2 w-100' onSubmit={handleSubmit} inline>
                <Row>
                    <FormGroup className='m-2'>
                        <Label for='title' className='mr-2'>Search by Title</Label>
                        <Input type='text' id='title' name='title' value={title} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button type='submit' className='btn btn-success m-2'>Search</Button>
                    </FormGroup>
                </Row>
            </Form>
        </Col>
    )
}

export default Search;