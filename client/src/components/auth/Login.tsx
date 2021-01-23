import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Col, Input, Label, Button, Card, CardBody, CardHeader} from 'reactstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        if(email !== 'mcdevittbass@gmail.com' || password !== 'password') {
            alert('Your email or password do not match our records. Please try again.');
        } else {
            history.push('/main');
        }
    }

    const handleInputChange = (e:FormEvent<HTMLFormElement>) => {
        // if(e.target.name === 'email') {
        //     setEmail(e.target.value);
        // } else if(e.target.name === 'password') {
        //     setPassword(e.target.value);
        // }
        // console.log(e.target.name + ': ' + e.target.value);
        console.log(e);
    }

    return (
        <Card className='w-75 m-3 justify-content-center'>
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
                            onChange={(e) => handleInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup className="row">
                        <Col>
                            <Label className="col-form-label" htmlFor="password">Password</Label>
                        </Col>
                        <Col className="col-sm-8">
                            <Input type="password" id="password" name="password" placeholder="Password" 
                            value={password}
                            onChange={(e) => handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 10, }} className='text-right'>
                            <Button className='m-1' color="secondary">Cancel</Button>
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

