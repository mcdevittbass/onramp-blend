import React, { FormEvent, useState, ChangeEvent, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Col, Input, Label, Button, Card, CardBody, CardHeader} from 'reactstrap';
import axios from 'axios';
import { ILoginProps } from './Landing'; 

const Login = ({ setFavorites, setUserPosts }:ILoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //send get request to db for this username + password combo
        try {
            const results = await axios({
                method: 'post',
                url: 'http://localhost:3001/user/login',
                data: {
                email: email,
                password: password
                }
            });
            if(results.status === 401) {
                alert('Wrong password or username!')
            } else if(results.status === 200) {
                localStorage.setItem('jwt', results.data.jwt);
                localStorage.setItem('user', results.data.userID)
                setFavorites(results.data.favorites ? results.data.favorites : []);
                history.push('/main');
            } else {
                alert('There was a problem. Please try again!')
            }
        } catch (err) {
            console.error(err)
        }           
    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'email') {
            setEmail(e.target.value);
        } else if(e.target.name === 'password') {
            setPassword(e.target.value);
        }
        //console.log(e.target.name + ': ' + e.target.value);
    }

    const handleCancel = (e:MouseEvent<HTMLButtonElement>) => {
        setEmail('');
        setPassword('');
    }

    return (
        <Card className='w-50 m-3'>
            <CardHeader>
                <b>Login</b>
            </CardHeader>
            <CardBody>
                <Form id="loginForm" onSubmit={handleSubmit}>
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
                    <FormGroup row>
                        <Col md={{size: 10, }} className='text-right'>
                            <Button className='m-1' color="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button type="submit" className='submit-button'>
                                Login
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
        
    );
}

export default Login;

