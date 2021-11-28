import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './frascos-de-fermentos.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFrascosDeFermentosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FrascosDeFermentosDetail = (props: IFrascosDeFermentosDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { frascosDeFermentosEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="frascosDeFermentosDetailsHeading">FrascosDeFermentos</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{frascosDeFermentosEntity.id}</dd>
          <dt>
            <span id="calidad">Calidad</span>
          </dt>
          <dd>{frascosDeFermentosEntity.calidad}</dd>
          <dt>
            <span id="fechaAnalisis">Fecha Analisis</span>
          </dt>
          <dd>
            {frascosDeFermentosEntity.fechaAnalisis ? (
              <TextFormat value={frascosDeFermentosEntity.fechaAnalisis} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{frascosDeFermentosEntity.estado}</dd>
          <dt>
            <span id="detalles">Detalles</span>
          </dt>
          <dd>{frascosDeFermentosEntity.detalles}</dd>
          <dt>
            <span id="peso">Peso</span>
          </dt>
          <dd>{frascosDeFermentosEntity.peso}</dd>
          <dt>Tipo</dt>
          <dd>{frascosDeFermentosEntity.tipo ? frascosDeFermentosEntity.tipo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/frascos-de-fermentos" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/frascos-de-fermentos/${frascosDeFermentosEntity.id}/edit`} replace color="success">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ frascosDeFermentos }: IRootState) => ({
  frascosDeFermentosEntity: frascosDeFermentos.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FrascosDeFermentosDetail);
