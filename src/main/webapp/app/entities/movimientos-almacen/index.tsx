import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MovimientosAlmacen from './movimientos-almacen';
import MovimientosAlmacenDetail from './movimientos-almacen-detail';
import MovimientosAlmacenUpdate from './movimientos-almacen-update';
import MovimientosAlmacenDeleteDialog from './movimientos-almacen-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MovimientosAlmacenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MovimientosAlmacenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MovimientosAlmacenDetail} />
      <ErrorBoundaryRoute path={match.url} component={MovimientosAlmacen} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MovimientosAlmacenDeleteDialog} />
  </>
);

export default Routes;
