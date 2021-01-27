import React, { FormEvent, ChangeEvent, MouseEvent, useState, SetStateAction } from 'react';
import { Form, FormGroup, Col, Input, Label, Button, Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

type TCreateProps = { setComponent: (currentComponent:SetStateAction<JSX.Element>)=> void}

const CreateAccount = ( { setComponent }:TCreateProps) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCompare, setPasswordCompare] = useState('');

    const isInvalid = password !== passwordCompare ||
        password === '' ||
        email === '';

    const history = useHistory();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        //send post request to db with username and password info
        //if success, send to Login
        //add notification "your account has been created"?
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3001/user/signup',
                data: {
                    first_name: firstName,
                    email: email,
                    password: password
                }
            });
            if(response.status === 200) {
                alert(`You have created a new account, ${firstName}! Login to view the blog.`)
            }
            console.log(response);
        } catch (err) {
            console.error(err);
        }
        history.push('/landing')
    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'firstName') {
            setFirstName(e.target.value);
        } else if(e.target.name === 'email') {
            setEmail(e.target.value);
        } else if(e.target.name === 'password') {
            setPassword(e.target.value);
        } else if(e.target.name === 'passwordCompare') {
            setPasswordCompare(e.target.value);
        }
    }

    const handleCancel = (e:MouseEvent<HTMLButtonElement>) => {
        setFirstName('');
        setEmail('');
        setPassword('');
        setPasswordCompare('');
    }

    return (
        <Card className='w-50 m-3'>
            <CardHeader>
                <b>Create an Account</b>
            </CardHeader>
            <CardBody>
                <Form id="loginForm" onSubmit={handleSubmit}>
                    <FormGroup className="row">
                        <Col>
                            <Label className="col-form-label" htmlFor="firstName">First Name</Label>
                        </Col>
                        <Col className="col-sm-8">
                            <Input type="text" id="firstName" name="firstName" placeholder="First Name"
                            value={firstName}
                            onChange={handleInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="row">
                        <Col>
                            <Label className="col-form-label" htmlFor="email">Email</Label>
                        </Col>
                        <Col className="col-sm-8">
                            <Input type="email" id="email" name="email" placeholder="Email"
                            value={email}
                            onChange={handleInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="row">
                        <Col>
                            <Label className="col-form-label" htmlFor="password">Password</Label>
                        </Col>
                        <Col className="col-sm-8">
                            <Input type="password" id="password" name="password" placeholder="Password" 
                            value={password}
                            onChange={handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row">
                        <Col>
                            <Label className="col-form-label" htmlFor="passwordCompare">Re-enter Password</Label>
                        </Col>
                        <Col className="col-sm-8">
                            <Input type="password" id="passwordCompare" name="passwordCompare" placeholder="Same Password" 
                            value={passwordCompare}
                            onChange={handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 10, }} className='text-right'>
                            <Button className='m-1' color="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button type="submit" className='btn submit-button' disabled={isInvalid}>
                                Create Account
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
        
    );
}

export default CreateAccount;