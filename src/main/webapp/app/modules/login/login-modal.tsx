import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

import './login.scss';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string) => void;
  handleClose: () => void;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false} className="login-modal">
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose}>
            Iniciar sesión
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger" data-cy="loginError">
                    <strong>Error al iniciar sesión,</strong> por favor checkea los datos y vuelve a ingresarlos.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label="Usuario"
                  placeholder="Tu usuario"
                  required
                  errorMessage="El nombre de usuario es requerido"
                  autoFocus
                  data-cy="username"
                />
                <AvField
                  name="password"
                  type="password"
                  label="Contraseña"
                  placeholder="Tu contraseña"
                  required
                  errorMessage="La contraseña es requerida"
                  data-cy="password"
                />
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="light">
              <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector">
                ¿Olvidaste tu contraseña?
              </Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex={1}>
              Cancel
            </Button>{' '}
            <Button color="primary" type="submit" data-cy="submit">
              Sign in
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
