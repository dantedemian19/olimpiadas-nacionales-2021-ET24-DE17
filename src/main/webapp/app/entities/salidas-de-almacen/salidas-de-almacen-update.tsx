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
import { getEntity, updateEntity, createEntity, reset } from './salidas-de-almacen.reducer';
import { ISalidasDeAlmacen } from 'app/shared/model/salidas-de-almacen.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalidasDeAlmacenUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalidasDeAlmacenUpdate = (props: ISalidasDeAlmacenUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { salidasDeAlmacenEntity, tandaQuesos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/salidas-de-almacen' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTandaQuesos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salidasDeAlmacenEntity,
        ...values,
        tandaDeQueso: tandaQuesos.find(it => it.id.toString() === values.tandaDeQuesoId.toString()),
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
          <h2 id="cCheeseApp.salidasDeAlmacen.home.createOrEditLabel" data-cy="SalidasDeAlmacenCreateUpdateHeading">
            Create or edit a SalidasDeAlmacen
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salidasDeAlmacenEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="salidas-de-almacen-id">ID</Label>
                  <AvInput id="salidas-de-almacen-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="pesoLabel" for="salidas-de-almacen-peso">
                  Peso
                </Label>
                <AvField
                  id="salidas-de-almacen-peso"
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
                <Label for="salidas-de-almacen-tandaDeQueso">Tanda De Queso</Label>
                <AvInput
                  id="salidas-de-almacen-tandaDeQueso"
                  data-cy="tandaDeQueso"
                  type="select"
                  className="form-control"
                  name="tandaDeQuesoId"
                >
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
              <Button tag={Link} id="cancel-save" to="/salidas-de-almacen" replace color="info">
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
  salidasDeAlmacenEntity: storeState.salidasDeAlmacen.entity,
  loading: storeState.salidasDeAlmacen.loading,
  updating: storeState.salidasDeAlmacen.updating,
  updateSuccess: storeState.salidasDeAlmacen.updateSuccess,
});

const mapDispatchToProps = {
  getTandaQuesos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalidasDeAlmacenUpdate);
