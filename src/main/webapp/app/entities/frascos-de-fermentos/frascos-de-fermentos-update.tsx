import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITipoDeQueso } from 'app/shared/model/tipo-de-queso.model';
import { getEntities as getTipoDeQuesos } from 'app/entities/tipo-de-queso/tipo-de-queso.reducer';
import { getEntity, updateEntity, createEntity, reset } from './frascos-de-fermentos.reducer';
import { IFrascosDeFermentos } from 'app/shared/model/frascos-de-fermentos.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import './frascos-de-fermentos.scss';

export interface IFrascosDeFermentosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FrascosDeFermentosUpdate = (props: IFrascosDeFermentosUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { frascosDeFermentosEntity, tipoDeQuesos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/frascos-de-fermentos' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTipoDeQuesos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaAnalisis = convertDateTimeToServer(values.fechaAnalisis);

    if (errors.length === 0) {
      const entity = {
        ...frascosDeFermentosEntity,
        ...values,
        tipo: tipoDeQuesos.find(it => it.id.toString() === values.tipoId.toString()),
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
          <h2 id="cCheeseApp.frascosDeFermentos.home.createOrEditLabel" data-cy="FrascosDeFermentosCreateUpdateHeading">
            Crear o editar Frascos de Fermentos
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : frascosDeFermentosEntity} onSubmit={saveEntity}>
              <AvGroup className="left-side-frascos">
                <Label id="calidadLabel" for="frascos-de-fermentos-calidad">
                  Calidad
                </Label>
                <AvField
                  id="frascos-de-fermentos-calidad"
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
              <AvGroup className="left-side-frascos">
                <Label id="fechaAnalisisLabel" for="frascos-de-fermentos-fechaAnalisis">
                  Fecha Analisis
                </Label>
                <AvInput
                  id="frascos-de-fermentos-fechaAnalisis"
                  data-cy="fechaAnalisis"
                  type="datetime-local"
                  className="form-control"
                  name="fechaAnalisis"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.frascosDeFermentosEntity.fechaAnalisis)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup className="left-side-frascos">
                <Label id="estadoLabel" for="frascos-de-fermentos-estado">
                  Estado
                </Label>
                <AvInput
                  id="frascos-de-fermentos-estado"
                  data-cy="estado"
                  type="select"
                  className="form-control"
                  name="estado"
                  value={(!isNew && frascosDeFermentosEntity.estado) || 'ALMACENADO'}
                >
                  <option value="ALMACENADO">ALMACENADO</option>
                  <option value="ENPRODUCCION">ENPRODUCCION</option>
                  <option value="AGOTADO">AGOTADO</option>
                </AvInput>
              </AvGroup>
              <AvGroup className="right-side-frascos">
                <Label id="detallesLabel" for="frascos-de-fermentos-detalles">
                  Detalles
                </Label>
                <AvField id="frascos-de-fermentos-detalles" data-cy="detalles" type="text" name="detalles" />
              </AvGroup>
              <AvGroup className="right-side-frascos">
                <Label id="pesoLabel" for="frascos-de-fermentos-peso">
                  Peso
                </Label>
                <AvField id="frascos-de-fermentos-peso" data-cy="peso" type="string" className="form-control" name="peso" />
              </AvGroup>
              <AvGroup className="right-side-frascos">
                <Label for="frascos-de-fermentos-tipo">Tipo</Label>
                <AvInput id="frascos-de-fermentos-tipo" data-cy="tipo" type="select" className="form-control" name="tipoId">
                  <option value="" key="0" />
                  {tipoDeQuesos
                    ? tipoDeQuesos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <div className="botonera-frascos">
                <Button tag={Link} id="cancel-save" to="/frascos-de-fermentos" replace color="info">
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
  tipoDeQuesos: storeState.tipoDeQueso.entities,
  frascosDeFermentosEntity: storeState.frascosDeFermentos.entity,
  loading: storeState.frascosDeFermentos.loading,
  updating: storeState.frascosDeFermentos.updating,
  updateSuccess: storeState.frascosDeFermentos.updateSuccess,
});

const mapDispatchToProps = {
  getTipoDeQuesos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FrascosDeFermentosUpdate);
