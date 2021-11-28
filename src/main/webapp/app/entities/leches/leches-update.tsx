import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICisternas } from 'app/shared/model/cisternas.model';
import { getEntities as getCisternas } from 'app/entities/cisternas/cisternas.reducer';
import { getEntity, updateEntity, createEntity, reset } from './leches.reducer';
import { ILeches } from 'app/shared/model/leches.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILechesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LechesUpdate = (props: ILechesUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { lechesEntity, cisternas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/leches' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCisternas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaDeIngreso = convertDateTimeToServer(values.fechaDeIngreso);

    if (errors.length === 0) {
      const entity = {
        ...lechesEntity,
        ...values,
        cisterna: cisternas.find(it => it.id.toString() === values.cisternaId.toString()),
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
          <h2 id="cCheeseApp.leches.home.createOrEditLabel" data-cy="LechesCreateUpdateHeading">
            Create or edit a Leches
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : lechesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="leches-id">ID</Label>
                  <AvInput id="leches-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="analisisLabel" for="leches-analisis">
                  Analisis
                </Label>
                <AvField
                  id="leches-analisis"
                  data-cy="analisis"
                  type="text"
                  name="analisis"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="calidadLabel" for="leches-calidad">
                  Calidad
                </Label>
                <AvField
                  id="leches-calidad"
                  data-cy="calidad"
                  type="string"
                  className="form-control"
                  name="calidad"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cantidadLabel" for="leches-cantidad">
                  Cantidad
                </Label>
                <AvField
                  id="leches-cantidad"
                  data-cy="cantidad"
                  type="string"
                  className="form-control"
                  name="cantidad"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fechaDeIngresoLabel" for="leches-fechaDeIngreso">
                  Fecha De Ingreso
                </Label>
                <AvInput
                  id="leches-fechaDeIngreso"
                  data-cy="fechaDeIngreso"
                  type="datetime-local"
                  className="form-control"
                  name="fechaDeIngreso"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.lechesEntity.fechaDeIngreso)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tamboLabel" for="leches-tambo">
                  Tambo
                </Label>
                <AvField
                  id="leches-tambo"
                  data-cy="tambo"
                  type="text"
                  name="tambo"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="temperaturaLabel" for="leches-temperatura">
                  Temperatura
                </Label>
                <AvField
                  id="leches-temperatura"
                  data-cy="temperatura"
                  type="string"
                  className="form-control"
                  name="temperatura"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="leches-cisterna">Cisterna</Label>
                <AvInput id="leches-cisterna" data-cy="cisterna" type="select" className="form-control" name="cisternaId">
                  <option value="" key="0" />
                  {cisternas
                    ? cisternas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/leches" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="success" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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
  cisternas: storeState.cisternas.entities,
  lechesEntity: storeState.leches.entity,
  loading: storeState.leches.loading,
  updating: storeState.leches.updating,
  updateSuccess: storeState.leches.updateSuccess,
});

const mapDispatchToProps = {
  getCisternas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LechesUpdate);
