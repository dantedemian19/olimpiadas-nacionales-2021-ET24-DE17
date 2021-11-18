import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoDeQueso from './tipo-de-queso';
import TipoDeQuesoDetail from './tipo-de-queso-detail';
import TipoDeQuesoUpdate from './tipo-de-queso-update';
import TipoDeQuesoDeleteDialog from './tipo-de-queso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoDeQuesoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoDeQuesoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoDeQuesoDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoDeQueso} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TipoDeQuesoDeleteDialog} />
  </>
);

export default Routes;
