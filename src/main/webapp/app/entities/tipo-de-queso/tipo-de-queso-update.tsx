import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tipo-de-queso.reducer';
import { ITipoDeQueso } from 'app/shared/model/tipo-de-queso.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import './tipo-de-queso.scss';

export interface ITipoDeQuesoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoDeQuesoUpdate = (props: ITipoDeQuesoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { tipoDeQuesoEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tipo-de-queso' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...tipoDeQuesoEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="cCheeseApp.tipoDeQueso.home.createOrEditarLabel" data-cy="TipoDeQuesoCreateUpdateHeading">
            Crear o editar Tipo de Queso
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tipoDeQuesoEntity} onSubmit={saveEntity}>
              <AvGroup className="left-side-tipo">
                <Label id="nombreLabel" for="tipo-de-queso-nombre">
                  Nombre
                </Label>
                <AvField
                  id="tipo-de-queso-nombre"
                  data-cy="nombre"
                  type="text"
                  name="nombre"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup className="right-side-tipo">
                <Label id="tiempoDeCuradoLabel" for="tipo-de-queso-tiempoDeCurado">
                  Tiempo De Curado
                </Label>
                <AvField
                  id="tipo-de-queso-tiempoDeCurado"
                  data-cy="tiempoDeCurado"
                  type="string"
                  className="form-control"
                  name="tiempoDeCurado"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <div className="botonera-tipo">
                <Button tag={Link} id="cancel-save" to="/tipo-de-queso" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="success" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </div>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tipoDeQuesoEntity: storeState.tipoDeQueso.entity,
  loading: storeState.tipoDeQueso.loading,
  updating: storeState.tipoDeQueso.updating,
  updateSuccess: storeState.tipoDeQueso.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoDeQuesoUpdate);
