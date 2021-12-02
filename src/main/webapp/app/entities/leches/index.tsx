import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Leches from './leches';
import LechesUpdate from './leches-update';
import LechesDeleteDialog from './leches-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LechesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LechesUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Leches} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LechesDeleteDialog} />
  </>
);

export default Routes;
