import React, { MouseEvent, SetStateAction, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { IMyPosts } from '../../App';

export interface ILoginProps { 
    setFavorites: (favorites: SetStateAction<number[]>) =>void,
    setUserPosts: (userPosts: SetStateAction<IMyPosts[]>) => void
}

//check for current auth token, then redirect to user page if current
const LandingPage = ({ setFavorites, setUserPosts }:ILoginProps) => {
    const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<Login setFavorites={setFavorites} setUserPosts={setUserPosts}/>)
    const [switchText, setSwitchText] = useState<string>("Don't already have an account? Create one.")

    const handleChangeComponent = (e:MouseEvent<HTMLButtonElement>) => {
        if(currentComponent.type.name === 'Login'){
            setCurrentComponent(<CreateAccount setComponent={setCurrentComponent}/>);
            setSwitchText("Already have an account? Login")
        } else {
            setCurrentComponent(<Login setFavorites={setFavorites} setUserPosts={setUserPosts}/>);
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
