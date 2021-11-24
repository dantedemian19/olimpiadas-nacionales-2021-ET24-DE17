import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITandaQuesos } from 'app/shared/model/tanda-quesos.model';
import { getEntities as getTandaQuesos } from 'app/entities/tanda-quesos/tanda-quesos.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './movimientos-almacen.reducer';
import { IMovimientosAlmacen } from 'app/shared/model/movimientos-almacen.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMovimientosAlmacenUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MovimientosAlmacenUpdate = (props: IMovimientosAlmacenUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { movimientosAlmacenEntity, tandaQuesos, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/movimientos-almacen' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTandaQuesos();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...movimientosAlmacenEntity,
        ...values,
        queso: tandaQuesos.find(it => it.id.toString() === values.quesoId.toString()),
        user: users.find(it => it.id.toString() === values.userId.toString()),
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
          <h2 id="cCheeseApp.movimientosAlmacen.home.createOrEditarLabel" data-cy="MovimientosAlmacenCreateUpdateHeading">
            Create or edit a MovimientosAlmacen
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : movimientosAlmacenEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="movimientos-almacen-id">ID</Label>
                  <AvInput id="movimientos-almacen-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="desdeLabel" for="movimientos-almacen-desde">
                  Desde
                </Label>
                <AvInput
                  id="movimientos-almacen-desde"
                  data-cy="desde"
                  type="select"
                  className="form-control"
                  name="desde"
                  value={(!isNew && movimientosAlmacenEntity.desde) || 'ENPRODUCCION'}
                >
                  <option value="ENPRODUCCION">ENPRODUCCION</option>
                  <option value="ENSALADO">ENSALADO</option>
                  <option value="ENCURADO">ENCURADO</option>
                  <option value="ENSTOCK">ENSTOCK</option>
                  <option value="OUTSTOCK">OUTSTOCK</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="haciaLabel" for="movimientos-almacen-hacia">
                  Hacia
                </Label>
                <AvInput
                  id="movimientos-almacen-hacia"
                  data-cy="hacia"
                  type="select"
                  className="form-control"
                  name="hacia"
                  value={(!isNew && movimientosAlmacenEntity.hacia) || 'ENPRODUCCION'}
                >
                  <option value="ENPRODUCCION">ENPRODUCCION</option>
                  <option value="ENSALADO">ENSALADO</option>
                  <option value="ENCURADO">ENCURADO</option>
                  <option value="ENSTOCK">ENSTOCK</option>
                  <option value="OUTSTOCK">OUTSTOCK</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="pesoLabel" for="movimientos-almacen-peso">
                  Peso
                </Label>
                <AvField
                  id="movimientos-almacen-peso"
                  data-cy="peso"
                  type="string"
                  className="form-control"
                  name="peso"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="movimientos-almacen-queso">Queso</Label>
                <AvInput id="movimientos-almacen-queso" data-cy="queso" type="select" className="form-control" name="quesoId">
                  <option value="" key="0" />
                  {tandaQuesos
                    ? tandaQuesos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="movimientos-almacen-user">User</Label>
                <AvInput id="movimientos-almacen-user" data-cy="user" type="select" className="form-control" name="userId" required>
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/movimientos-almacen" replace color="info">
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
  tandaQuesos: storeState.tandaQuesos.entities,
  users: storeState.userManagement.users,
  movimientosAlmacenEntity: storeState.movimientosAlmacen.entity,
  loading: storeState.movimientosAlmacen.loading,
  updating: storeState.movimientosAlmacen.updating,
  updateSuccess: storeState.movimientosAlmacen.updateSuccess,
});

const mapDispatchToProps = {
  getTandaQuesos,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovimientosAlmacenUpdate);
