import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MovimientosAlmacen from './movimientos-almacen';
import MovimientosAlmacenUpdate from './movimientos-almacen-update';
import MovimientosAlmacenEliminarDialog from './movimientos-almacen-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MovimientosAlmacenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MovimientosAlmacenUpdate} />
      <ErrorBoundaryRoute path={match.url} component={MovimientosAlmacen} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MovimientosAlmacenEliminarDialog} />
  </>
);

export default Routes;
