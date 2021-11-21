import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cisternas.reducer';
import { ICisternas } from 'app/shared/model/cisternas.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICisternasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CisternasUpdate = (props: ICisternasUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { cisternasEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cisternas' + props.location.search);
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
        ...cisternasEntity,
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
          <h2 id="cCheeseApp.cisternas.home.createOrEditLabel" data-cy="CisternasCreateUpdateHeading">
            Create or edit a Cisternas
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cisternasEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cisternas-id">ID</Label>
                  <AvInput id="cisternas-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="capacidadLabel" for="cisternas-capacidad">
                  Capacidad
                </Label>
                <AvField
                  id="cisternas-capacidad"
                  data-cy="capacidad"
                  type="string"
                  className="form-control"
                  name="capacidad"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="estadoLabel" for="cisternas-estado">
                  Estado
                </Label>
                <AvInput
                  id="cisternas-estado"
                  data-cy="estado"
                  type="select"
                  className="form-control"
                  name="estado"
                  value={(!isNew && cisternasEntity.estado) || 'INNOPERATIVO'}
                >
                  <option value="INNOPERATIVO">INNOPERATIVO</option>
                  <option value="OPERATIVO">OPERATIVO</option>
                  <option value="INREPARACION">INREPARACION</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="reservaLabel" for="cisternas-reserva">
                  Reserva
                </Label>
                <AvField
                  id="cisternas-reserva"
                  data-cy="reserva"
                  type="string"
                  className="form-control"
                  name="reserva"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cisternas" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  cisternasEntity: storeState.cisternas.entity,
  loading: storeState.cisternas.loading,
  updating: storeState.cisternas.updating,
  updateSuccess: storeState.cisternas.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CisternasUpdate);
