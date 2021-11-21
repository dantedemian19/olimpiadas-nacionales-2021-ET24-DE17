import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './movimientos-almacen.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovimientosAlmacenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MovimientosAlmacenDetail = (props: IMovimientosAlmacenDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { movimientosAlmacenEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="movimientosAlmacenDetailsHeading">MovimientosAlmacen</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{movimientosAlmacenEntity.id}</dd>
          <dt>
            <span id="desde">Desde</span>
          </dt>
          <dd>{movimientosAlmacenEntity.desde}</dd>
          <dt>
            <span id="hacia">Hacia</span>
          </dt>
          <dd>{movimientosAlmacenEntity.hacia}</dd>
          <dt>
            <span id="peso">Peso</span>
          </dt>
          <dd>{movimientosAlmacenEntity.peso}</dd>
          <dt>Queso</dt>
          <dd>{movimientosAlmacenEntity.queso ? movimientosAlmacenEntity.queso.id : ''}</dd>
          <dt>User</dt>
          <dd>{movimientosAlmacenEntity.user ? movimientosAlmacenEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/movimientos-almacen" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/movimientos-almacen/${movimientosAlmacenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ movimientosAlmacen }: IRootState) => ({
  movimientosAlmacenEntity: movimientosAlmacen.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovimientosAlmacenDetail);
