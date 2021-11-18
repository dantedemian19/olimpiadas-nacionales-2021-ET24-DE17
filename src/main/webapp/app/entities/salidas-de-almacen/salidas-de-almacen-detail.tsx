import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './salidas-de-almacen.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISalidasDeAlmacenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalidasDeAlmacenDetail = (props: ISalidasDeAlmacenDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { salidasDeAlmacenEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="salidasDeAlmacenDetailsHeading">SalidasDeAlmacen</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{salidasDeAlmacenEntity.id}</dd>
          <dt>
            <span id="peso">Peso</span>
          </dt>
          <dd>{salidasDeAlmacenEntity.peso}</dd>
          <dt>Tanda De Queso</dt>
          <dd>{salidasDeAlmacenEntity.tandaDeQueso ? salidasDeAlmacenEntity.tandaDeQueso.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/salidas-de-almacen" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/salidas-de-almacen/${salidasDeAlmacenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ salidasDeAlmacen }: IRootState) => ({
  salidasDeAlmacenEntity: salidasDeAlmacen.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalidasDeAlmacenDetail);
