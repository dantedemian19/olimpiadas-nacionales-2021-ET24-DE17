import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tipo-de-queso.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoDeQuesoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoDeQuesoDetail = (props: ITipoDeQuesoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tipoDeQuesoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tipoDeQuesoDetailsHeading">TipoDeQueso</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{tipoDeQuesoEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{tipoDeQuesoEntity.nombre}</dd>
          <dt>
            <span id="tiempoDeCurado">Tiempo De Curado</span>
          </dt>
          <dd>{tipoDeQuesoEntity.tiempoDeCurado}</dd>
        </dl>
        <Button tag={Link} to="/tipo-de-queso" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tipo-de-queso/${tipoDeQuesoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tipoDeQueso }: IRootState) => ({
  tipoDeQuesoEntity: tipoDeQueso.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoDeQuesoDetail);
