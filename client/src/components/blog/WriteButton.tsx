import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col } from 'reactstrap';

const WriteButton = (props:any) => {

    const history = useHistory();

    const handleNav = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/write');
    }

    return (
        <Col className='col-12 m-2 m-md-0 col-md-3 text-center' >
            <Button onClick={handleNav}>Create a post</Button>
        </Col>
    )
}

export default WriteButton;