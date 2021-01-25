import React, { MouseEvent, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Login from './Login';
import CreateAccount from './CreateAccount';

const LandingPage = () => {
    const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<Login />)
    const [switchText, setSwitchText] = useState<string>("Don't already have an account? Create one.")

    const handleChangeComponent = (e:MouseEvent<HTMLButtonElement>) => {
        if(currentComponent.type.name === 'Login'){
            setCurrentComponent(<CreateAccount setComponent={setCurrentComponent}/>);
            setSwitchText("Already have an account? Login")
        } else {
            setCurrentComponent(<Login />);
            setSwitchText("Don't already have an account? Create one.")
        }
    }

    return (
        <>
            <Row className='justify-content-center'>
                {currentComponent}
            </Row>
            <Row>
                <Col className='text-center m-4'>
                    <Button color='light' onClick={handleChangeComponent}>{switchText}</Button>
                </Col>
            </Row>
        </>
    )
};

export default LandingPage;
