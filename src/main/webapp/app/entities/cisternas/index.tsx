import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cisternas from './cisternas';
import CisternasDetail from './cisternas-detail';
import CisternasUpdate from './cisternas-update';
import CisternasEliminarDialog from './cisternas-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CisternasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CisternasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CisternasDetail} />
      <ErrorBoundaryRoute path={match.url} component={Cisternas} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CisternasEliminarDialog} />
  </>
);

export default Routes;
