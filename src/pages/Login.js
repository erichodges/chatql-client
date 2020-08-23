import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions?.errors),
    onCompleted(data) {
      localStorage.setItem('token', data.login.token);
      props.history.push('/');
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
    setVariables({
      username: '',
      password: '',
    });
    setErrors({});
  };

  return (
    <div>
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <div>
            <Form onSubmit={submitLoginForm}>
              {/* <Form.Group>
                <Form.Label className={errors?.email && 'text-danger'}>
                  {errors?.email ? 'Email address' : 'Email address'}
                </Form.Label>
                <Form.Control
                  type="email"
                  value={variables.email}
                  className={errors?.email && 'is-invalid'}
                  onChange={(e) =>
                    setVariables({ ...variables, email: e.target.value })
                  }
                />
              </Form.Group> */}
              <Form.Group>
                <Form.Label className={errors?.username && 'text-danger'}>
                  {errors?.username ?? 'Username'}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={variables.username}
                  className={errors?.username && 'is-invalid'}
                  onChange={(e) =>
                    setVariables({ ...variables, username: e.target.value })
                  }
                />
              </Form.Group>{' '}
              <Form.Group>
                <Form.Label className={errors?.password && 'text-danger'}>
                  {errors?.password ?? 'Password'}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={variables.password}
                  className={errors?.password && 'is-invalid'}
                  onChange={(e) =>
                    setVariables({ ...variables, password: e.target.value })
                  }
                />
              </Form.Group>{' '}
              {/* <Form.Group>
                <Form.Label
                  className={errors?.confirmPassword && 'text-danger'}
                >
                  {errors?.confirmPassword ?? 'Confirm Password'}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={variables.confirmPassword}
                  className={errors?.confirmPassword && 'is-invalid'}
                  onChange={(e) =>
                    setVariables({
                      ...variables,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Form.Group> */}
              <div className="text-center">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? 'loading...' : 'Login'}
                </Button>
                <br />
                <br />
                <small>
                  Don't have an account? <Link to="/register">Register</Link>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
