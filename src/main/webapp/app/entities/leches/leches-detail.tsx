import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './leches.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILechesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LechesDetail = (props: ILechesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { lechesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="lechesDetailsHeading">Leches</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{lechesEntity.id}</dd>
          <dt>
            <span id="analisis">Analisis</span>
          </dt>
          <dd>{lechesEntity.analisis}</dd>
          <dt>
            <span id="calidad">Calidad</span>
          </dt>
          <dd>{lechesEntity.calidad}</dd>
          <dt>
            <span id="cantidad">Cantidad</span>
          </dt>
          <dd>{lechesEntity.cantidad}</dd>
          <dt>
            <span id="fechaDeIngreso">Fecha De Ingreso</span>
          </dt>
          <dd>
            {lechesEntity.fechaDeIngreso ? <TextFormat value={lechesEntity.fechaDeIngreso} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="tambo">Tambo</span>
          </dt>
          <dd>{lechesEntity.tambo}</dd>
          <dt>
            <span id="temperatura">Temperatura</span>
          </dt>
          <dd>{lechesEntity.temperatura}</dd>
          <dt>Cisterna</dt>
          <dd>{lechesEntity.cisterna ? lechesEntity.cisterna.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/leches" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/leches/${lechesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ leches }: IRootState) => ({
  lechesEntity: leches.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LechesDetail);
