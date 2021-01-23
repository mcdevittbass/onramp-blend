import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Col, Row, FormGroup, Label } from 'reactstrap';
import { IBlogPost } from '../../App';

type TSearchProps = { 
    blogData: IBlogPost[], 
    setList: (list:React.SetStateAction<IBlogPost[]>)=>void 
};

const Search = ({ blogData, setList } :TSearchProps) => {
    const [selected, setSelected] = useState<string>('title');
    const [selectedValue, setSelectedValue] = useState<string>('');


    const handleChangeParam = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setSelectedValue('');
        let paramValue = e.target.value;
        setSelected(paramValue);
    }

    const handleSetParamValue = (e: React.ChangeEvent<HTMLInputElement>):void => {
        e.preventDefault();
        setSelectedValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if(selectedValue.length > 0) {
            switch(selected) {
                case 'title':
                    const titleFilter:IBlogPost[] = blogData.filter((blog:IBlogPost) => {
                        return blog.title.toLowerCase().includes(selectedValue.toLowerCase()); 
                    });
                    setList(titleFilter);
                    break;
                case 'author':
                    const authorFilter:IBlogPost[] = blogData.filter((blog:IBlogPost) => {
                        return blog.author.toLowerCase().includes(selectedValue.toLowerCase()); 
                    });
                    setList(authorFilter);
                    break;
                default:
                    console.error("There was a problem with the select element.")
            }
        } else {
            setList(blogData);
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
                        <Input type='text' id={selected} name={selected} value={selectedValue} onChange={handleSetParamValue} />
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