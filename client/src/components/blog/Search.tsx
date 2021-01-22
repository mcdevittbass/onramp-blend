import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, FormGroup, Label } from 'reactstrap';

type TSearchProps = { 
    setTitle: (title:string)=>void, 
    setAuthor: (author:string)=>void
};

const Search = ({ setTitle, setAuthor } :TSearchProps) => {
    // const [localTitle, setLocalTitle] = useState<string>('');
    // const [localAuthor, setLocalAuthor] = useState<string>('');
    const [selected, setSelected] = useState<string>('title');
    const [localValue, setLocalValue] = useState<string>('');

    const handleChangeParam = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setTitle('');
        setAuthor('');
        let paramValue = e.target.value;
        setSelected(paramValue);
    }

    const handleSetParams = (e: React.ChangeEvent<HTMLInputElement>):void => {
        e.preventDefault();
        setLocalValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(selected == 'title') {
            setTitle(localValue);
        } else {
            setAuthor(localValue);
        }
    }

    return (
        <Col>
            <Form className='m-4 p-2 w-100' onSubmit={handleSubmit} inline>
                <Row>
                    <FormGroup>
                        <Label for='searchParam' className='mr-2'>Search by </Label>
                        <Input type='select' name='searchParam' id='searchParam' onChange={handleChangeParam}>
                            <option value='title'>Title</option>
                            <option value='author'>Author</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className='m-2'>
                        <Input type='text' id={selected} name={selected} value={localValue || ''} onChange={handleSetParams} />
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