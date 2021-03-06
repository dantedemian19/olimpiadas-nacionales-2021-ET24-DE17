import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FrascosDeFermentos from './frascos-de-fermentos';
import FrascosDeFermentosUpdate from './frascos-de-fermentos-update';
import FrascosDeFermentosDeleteDialog from './frascos-de-fermentos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FrascosDeFermentosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FrascosDeFermentosUpdate} />
      <ErrorBoundaryRoute path={match.url} component={FrascosDeFermentos} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FrascosDeFermentosDeleteDialog} />
  </>
);

export default Routes;
