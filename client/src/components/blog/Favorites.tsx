import React, { useState } from 'react';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { IBlogPost } from './Main';

type TFaveProps = { 
    blogData: IBlogPost[],
    setList: (list:React.SetStateAction<IBlogPost[]>)=>void 
}

const FavoriteButton = ({ blogData, setList }:TFaveProps) => {
    const [checked, setChecked] = useState('');

    const handleShowFavorites = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let checkValue = event.target.value;
        if(checkValue == '') {
            const favorites = blogData.filter((post:IBlogPost) => {
                return post.favorite == true;
            });
            setChecked('fave');
            setList(favorites);
        } else {
            setChecked('');
            setList(blogData);
        }
    }

    return (
        <Col className='col-12 m-2 m-md-0 col-md-3 text-center'>
            <FormGroup check>
                <Label check>
                    <Input type='checkbox' name='fave' value={checked} onChange={handleShowFavorites}></Input>
                    Show My Favorites
                </Label>
            </FormGroup>
            {/* <Button onClick={handleShowFavorites}>Show My Favorites</Button> */}
        </Col>
    )
}

export default FavoriteButton;