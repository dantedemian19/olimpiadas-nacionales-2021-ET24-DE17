import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cisternas.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICisternasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CisternasDetail = (props: ICisternasDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cisternasEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cisternasDetailsHeading">Cisternas</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cisternasEntity.id}</dd>
          <dt>
            <span id="capacidad">Capacidad</span>
          </dt>
          <dd>{cisternasEntity.capacidad}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{cisternasEntity.estado}</dd>
          <dt>
            <span id="reserva">Reserva</span>
          </dt>
          <dd>{cisternasEntity.reserva}</dd>
        </dl>
        <Button tag={Link} to="/cisternas" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cisternas/${cisternasEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cisternas }: IRootState) => ({
  cisternasEntity: cisternas.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CisternasDetail);
