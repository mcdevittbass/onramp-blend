import React, { useEffect, useState } from 'react';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { IBlogPost } from '../../App';

type TFaveProps = { 
    blogData: IBlogPost[],
    favorites: number[],
    setList: (list:React.SetStateAction<IBlogPost[]>)=>void 
}

const FavoriteCheckBox = ({ blogData, setList, favorites }:TFaveProps) => {
    const [checked, setChecked] = useState('');
    const [favePosts, setFavePosts] = useState<IBlogPost[]>(getFaves());
    
    function getFaves():IBlogPost[] {
        let data = blogData || [];
        return blogData.filter((post) => favorites.includes(post.blogID));
    }

    useEffect(() => {
        setFavePosts(getFaves());
    }, [favorites])

    const handleShowFavorites = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let checkValue = event.target.value;
        if(checkValue.length < 1) {
            setChecked('fave');
            setList(favePosts);
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
        </Col>
    )
}

export default FavoriteCheckBox;