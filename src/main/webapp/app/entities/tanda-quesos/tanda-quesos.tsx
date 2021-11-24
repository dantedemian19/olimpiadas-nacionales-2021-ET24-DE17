// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tanda-quesos.reducer';
import { ITandaQuesos } from 'app/shared/model/tanda-quesos.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';

export interface ITandaQuesosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TandaQuesos = (props: ITandaQuesosProps) => {
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

  const { tandaQuesosList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="tanda-quesos-heading" data-cy="TandaQuesosHeading">
        Tanda Quesos
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Tanda Quesos
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tandaQuesosList && tandaQuesosList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('peso')}>
                  Peso <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pesoInicial')}>
                  Peso Inicial <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fechaEntradaCuracion')}>
                  Fecha Entrada Curacion <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fechaSalidaCuracion')}>
                  Fecha Salida Curacion <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Leche <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Fermento <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Tipo <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tandaQuesosList.map((tandaQuesos, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${tandaQuesos.id}`} color="link" size="sm">
                      {tandaQuesos.id}
                    </Button>
                  </td>
                  <td>{tandaQuesos.estado}</td>
                  <td>{tandaQuesos.peso}</td>
                  <td>{tandaQuesos.pesoInicial}</td>
                  <td>
                    {tandaQuesos.fechaEntradaCuracion ? (
                      <TextFormat type="date" value={tandaQuesos.fechaEntradaCuracion} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {tandaQuesos.fechaSalidaCuracion ? (
                      <TextFormat type="date" value={tandaQuesos.fechaSalidaCuracion} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{tandaQuesos.leche ? <Link to={`leches/${tandaQuesos.leche.id}`}>{tandaQuesos.leche.id}</Link> : ''}</td>
                  <td>
                    {tandaQuesos.fermento ? (
                      <Link to={`frascos-de-fermentos/${tandaQuesos.fermento.id}`}>{tandaQuesos.fermento.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{tandaQuesos.tipo ? <Link to={`tipo-de-queso/${tandaQuesos.tipo.id}`}>{tandaQuesos.tipo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tandaQuesos.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Detalles</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tandaQuesos.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditarButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${tandaQuesos.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Tanda Quesos found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={tandaQuesosList && tandaQuesosList.length > 0 ? '' : 'd-none'}>
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
            labels: tandaQuesosList.map(tandaQuesos => tandaQuesos.id),
            datasets: [
              {
                label: 'Peso',
                data: tandaQuesosList.map(tandaQuesos => tandaQuesos.peso),
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
              {
                label: 'Peso inicial',
                data: tandaQuesosList.map(tandaQuesos => tandaQuesos.pesoInicial),
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

const mapStateToProps = ({ tandaQuesos }: IRootState) => ({
  tandaQuesosList: tandaQuesos.entities,
  loading: tandaQuesos.loading,
  totalItems: tandaQuesos.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TandaQuesos);
