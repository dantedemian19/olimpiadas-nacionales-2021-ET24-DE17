import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TandaQuesos from './tanda-quesos';
import TandaQuesosDetail from './tanda-quesos-detail';
import TandaQuesosUpdate from './tanda-quesos-update';
import TandaQuesosEliminarDialog from './tanda-quesos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TandaQuesosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TandaQuesosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TandaQuesosDetail} />
      <ErrorBoundaryRoute path={match.url} component={TandaQuesos} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TandaQuesosEliminarDialog} />
  </>
);

export default Routes;
