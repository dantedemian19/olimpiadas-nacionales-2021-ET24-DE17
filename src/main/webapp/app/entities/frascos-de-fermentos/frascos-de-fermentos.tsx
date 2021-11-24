// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './frascos-de-fermentos.reducer';
import { IFrascosDeFermentos } from 'app/shared/model/frascos-de-fermentos.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';

export interface IFrascosDeFermentosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FrascosDeFermentos = (props: IFrascosDeFermentosProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  Chart.register(CategoryScale, ...registerables);

  const { frascosDeFermentosList, match, loading, totalItems } = props;
  return (
    <div className="container-entities">
      <h2 id="frascos-de-fermentos-heading" data-cy="FrascosDeFermentosHeading">
        Frascos De Fermentos
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Frascos De Fermentos
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {frascosDeFermentosList && frascosDeFermentosList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('calidad')}>
                  Calidad <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fechaAnalisis')}>
                  Fecha Analisis <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('detalles')}>
                  Detalles <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('peso')}>
                  Peso <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Tipo <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {frascosDeFermentosList.map((frascosDeFermentos, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${frascosDeFermentos.id}`} color="link" size="sm">
                      {frascosDeFermentos.id}
                    </Button>
                  </td>
                  <td>{frascosDeFermentos.calidad}</td>
                  <td>
                    {frascosDeFermentos.fechaAnalisis ? (
                      <TextFormat type="date" value={frascosDeFermentos.fechaAnalisis} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{frascosDeFermentos.estado}</td>
                  <td>{frascosDeFermentos.detalles}</td>
                  <td>{frascosDeFermentos.peso}</td>
                  <td>
                    {frascosDeFermentos.tipo ? (
                      <Link to={`tipo-de-queso/${frascosDeFermentos.tipo.id}`}>{frascosDeFermentos.tipo.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${frascosDeFermentos.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Detalles</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${frascosDeFermentos.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditarButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${frascosDeFermentos.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityEliminarButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Frascos De Fermentos found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={frascosDeFermentosList && frascosDeFermentosList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
      <div style={{ width: '50%', margin: '0 20%' }}>
        <Bar
          style={{ marginTop: 45, marginLeft: '15%' }}
          data={{
            labels: frascosDeFermentosList.map(frascosDeFermentos => frascosDeFermentos.id),
            datasets: [
              {
                label: 'Peso',
                data: frascosDeFermentosList.map(frascosDeFermentos => frascosDeFermentos.peso),
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
              {
                label: 'Calidad',
                data: frascosDeFermentosList.map(frascosDeFermentos => frascosDeFermentos.calidad),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ frascosDeFermentos }: IRootState) => ({
  frascosDeFermentosList: frascosDeFermentos.entities,
  loading: frascosDeFermentos.loading,
  totalItems: frascosDeFermentos.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FrascosDeFermentos);
