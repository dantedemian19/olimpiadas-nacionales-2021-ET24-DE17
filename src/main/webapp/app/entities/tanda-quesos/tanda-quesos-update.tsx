import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILeches } from 'app/shared/model/leches.model';
import { getEntities as getLeches } from 'app/entities/leches/leches.reducer';
import { IFrascosDeFermentos } from 'app/shared/model/frascos-de-fermentos.model';
import { getEntities as getFrascosDeFermentos } from 'app/entities/frascos-de-fermentos/frascos-de-fermentos.reducer';
import { ITipoDeQueso } from 'app/shared/model/tipo-de-queso.model';
import { getEntities as getTipoDeQuesos } from 'app/entities/tipo-de-queso/tipo-de-queso.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tanda-quesos.reducer';
import { ITandaQuesos } from 'app/shared/model/tanda-quesos.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import './tanda-quesos.scss';

export interface ITandaQuesosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TandaQuesosUpdate = (props: ITandaQuesosUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { tandaQuesosEntity, leches, frascosDeFermentos, tipoDeQuesos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tanda-quesos' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLeches();
    props.getFrascosDeFermentos();
    props.getTipoDeQuesos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaEntradaCuracion = convertDateTimeToServer(values.fechaEntradaCuracion);
    values.fechaSalidaCuracion = convertDateTimeToServer(values.fechaSalidaCuracion);

    if (errors.length === 0) {
      const entity = {
        ...tandaQuesosEntity,
        ...values,
        leche: leches.find(it => it.id.toString() === values.lecheId.toString()),
        fermento: frascosDeFermentos.find(it => it.id.toString() === values.fermentoId.toString()),
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
          <h2 id="cCheeseApp.tandaQuesos.home.createOrEditLabel" data-cy="TandaQuesosCreateUpdateHeading">
            Crear o editar Tanda de Quesos
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tandaQuesosEntity} onSubmit={saveEntity}>
              <AvGroup className="left-side-tanda">
                <Label id="estadoLabel" for="tanda-quesos-estado">
                  Estado
                </Label>
                <AvInput
                  id="tanda-quesos-estado"
                  data-cy="estado"
                  type="select"
                  className="form-control"
                  name="estado"
                  value={(!isNew && tandaQuesosEntity.estado) || 'ENPRODUCCION'}
                >
                  <option value="ENPRODUCCION">ENPRODUCCION</option>
                  <option value="ENSALADO">ENSALADO</option>
                  <option value="ENCURADO">ENCURADO</option>
                  <option value="ENSTOCK">ENSTOCK</option>
                  <option value="OUTSTOCK">OUTSTOCK</option>
                </AvInput>
              </AvGroup>
              <AvGroup className="left-side-tanda">
                <Label id="pesoLabel" for="tanda-quesos-peso">
                  Peso
                </Label>
                <AvField
                  id="tanda-quesos-peso"
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
              <AvGroup className="left-side-tanda">
                <Label id="pesoInicialLabel" for="tanda-quesos-pesoInicial">
                  Peso Inicial
                </Label>
                <AvField
                  id="tanda-quesos-pesoInicial"
                  data-cy="pesoInicial"
                  type="string"
                  className="form-control"
                  name="pesoInicial"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup className="left-side-tanda">
                <Label id="fechaEntradaCuracionLabel" for="tanda-quesos-fechaEntradaCuracion">
                  Fecha Entrada Curacion
                </Label>
                <AvInput
                  id="tanda-quesos-fechaEntradaCuracion"
                  data-cy="fechaEntradaCuracion"
                  type="datetime-local"
                  className="form-control"
                  name="fechaEntradaCuracion"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tandaQuesosEntity.fechaEntradaCuracion)}
                />
              </AvGroup>
              <AvGroup className="right-side-tanda">
                <Label for="tanda-quesos-leche">Leche</Label>
                <AvInput id="tanda-quesos-leche" data-cy="leche" type="select" className="form-control" name="lecheId">
                  <option value="" key="0" />
                  {leches
                    ? leches.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.analisis}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup className="right-side-tanda">
                <Label for="tanda-quesos-fermento">Fermento</Label>
                <AvInput id="tanda-quesos-fermento" data-cy="fermento" type="select" className="form-control" name="fermentoId">
                  <option value="" key="0" />
                  {frascosDeFermentos
                    ? frascosDeFermentos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup className="right-side-tanda">
                <Label for="tanda-quesos-tipo">Tipo</Label>
                <AvInput id="tanda-quesos-tipo" data-cy="tipo" type="select" className="form-control" name="tipoId">
                  <option value="" key="0" />
                  {tipoDeQuesos
                    ? tipoDeQuesos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup className="right-side-tanda">
                <Label id="fechaSalidaCuracionLabel" for="tanda-quesos-fechaSalidaCuracion">
                  Fecha Salida Curacion
                </Label>
                <AvInput
                  id="tanda-quesos-fechaSalidaCuracion"
                  data-cy="fechaSalidaCuracion"
                  type="datetime-local"
                  className="form-control"
                  name="fechaSalidaCuracion"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tandaQuesosEntity.fechaSalidaCuracion)}
                />
              </AvGroup>
              <div className="botonera-tanda">
                <Button tag={Link} id="cancel-save" to="/tanda-quesos" replace color="info">
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
  leches: storeState.leches.entities,
  frascosDeFermentos: storeState.frascosDeFermentos.entities,
  tipoDeQuesos: storeState.tipoDeQueso.entities,
  tandaQuesosEntity: storeState.tandaQuesos.entity,
  loading: storeState.tandaQuesos.loading,
  updating: storeState.tandaQuesos.updating,
  updateSuccess: storeState.tandaQuesos.updateSuccess,
});

const mapDispatchToProps = {
  getLeches,
  getFrascosDeFermentos,
  getTipoDeQuesos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TandaQuesosUpdate);
