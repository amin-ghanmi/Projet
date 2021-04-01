import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../js/actions/userActions';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const loginUser = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    const { isAuth, loading, errors } = useSelector(state => state.userReducer)

    return (
        <div className="col-md-7 mx-auto">
            { errors.id === "login" && <Alert variant="danger">{errors.err[0].msg}</Alert>}
            {
                loading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> : isAuth ? <Redirect to="/profile" /> :
                    <Form>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" onChange={e => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} value={password} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={loginUser}>
                            Submit
                        </Button>
                        <Link to="/register" >Register Here</Link>
                    </Form>
            }
        </div>
    )
}

export default Login;
