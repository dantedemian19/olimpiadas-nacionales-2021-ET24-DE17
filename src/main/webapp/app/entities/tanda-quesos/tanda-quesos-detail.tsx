import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tanda-quesos.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITandaQuesosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TandaQuesosDetail = (props: ITandaQuesosDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tandaQuesosEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tandaQuesosDetailsHeading">TandaQuesos</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{tandaQuesosEntity.id}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{tandaQuesosEntity.estado}</dd>
          <dt>
            <span id="peso">Peso</span>
          </dt>
          <dd>{tandaQuesosEntity.peso}</dd>
          <dt>
            <span id="pesoInicial">Peso Inicial</span>
          </dt>
          <dd>{tandaQuesosEntity.pesoInicial}</dd>
          <dt>
            <span id="fechaEntradaCuracion">Fecha Entrada Curacion</span>
          </dt>
          <dd>
            {tandaQuesosEntity.fechaEntradaCuracion ? (
              <TextFormat value={tandaQuesosEntity.fechaEntradaCuracion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaSalidaCuracion">Fecha Salida Curacion</span>
          </dt>
          <dd>
            {tandaQuesosEntity.fechaSalidaCuracion ? (
              <TextFormat value={tandaQuesosEntity.fechaSalidaCuracion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Leche</dt>
          <dd>{tandaQuesosEntity.leche ? tandaQuesosEntity.leche.id : ''}</dd>
          <dt>Fermento</dt>
          <dd>{tandaQuesosEntity.fermento ? tandaQuesosEntity.fermento.id : ''}</dd>
          <dt>Tipo</dt>
          <dd>{tandaQuesosEntity.tipo ? tandaQuesosEntity.tipo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tanda-quesos" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tanda-quesos/${tandaQuesosEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tandaQuesos }: IRootState) => ({
  tandaQuesosEntity: tandaQuesos.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TandaQuesosDetail);
