import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SalidasDeAlmacen from './salidas-de-almacen';
import SalidasDeAlmacenDetail from './salidas-de-almacen-detail';
import SalidasDeAlmacenUpdate from './salidas-de-almacen-update';
import SalidasDeAlmacenDeleteDialog from './salidas-de-almacen-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SalidasDeAlmacenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SalidasDeAlmacenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SalidasDeAlmacenDetail} />
      <ErrorBoundaryRoute path={match.url} component={SalidasDeAlmacen} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SalidasDeAlmacenDeleteDialog} />
  </>
);

export default Routes;
