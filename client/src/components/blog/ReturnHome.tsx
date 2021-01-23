import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Button } from 'reactstrap';

const ReturnHome = () => {
    const history = useHistory();

    const handleGoHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/main');
    }

    return (
        <Row className='justify-content-center p-4'>
            <Button onClick={handleGoHome}>Return to main page</Button>
        </Row>
    )
}

export default ReturnHome;