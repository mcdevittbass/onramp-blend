import React from 'react';
import { Col, Button } from 'reactstrap';

const FavoriteButton = (props:any) => {
    const handleShowFavorites = (e: React.MouseEvent<HTMLButtonElement>): void => {
        //make a get request where favorite=true;
        
        console.log("favorites button clicked");
    }

    return (
        <Col className='text-center'>
            <Button onClick={handleShowFavorites}>Show My Favorites</Button>
        </Col>
    )
}

export default FavoriteButton;