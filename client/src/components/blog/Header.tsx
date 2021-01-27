import React, {MouseEvent} from 'react';
import { Row, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    const handleSignOut = (e: MouseEvent<HTMLButtonElement>): void => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        history.push('/landing');
    }

    return (
        <Row id='header' className='m-2 p-3 justify-content-end'>
            <Button id='signout-button' data-testid='signOUT' onClick={handleSignOut}>Sign Out</Button>
        </Row>
    )
}

export default Header;