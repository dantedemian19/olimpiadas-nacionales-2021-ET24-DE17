import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Leches from './leches';
import Cisternas from './cisternas';
import FrascosDeFermentos from './frascos-de-fermentos';
import TandaQuesos from './tanda-quesos';
import TipoDeQueso from './tipo-de-queso';
import SalidasDeAlmacen from './salidas-de-almacen';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}leches`} component={Leches} />
      <ErrorBoundaryRoute path={`${match.url}cisternas`} component={Cisternas} />
      <ErrorBoundaryRoute path={`${match.url}frascos-de-fermentos`} component={FrascosDeFermentos} />
      <ErrorBoundaryRoute path={`${match.url}tanda-quesos`} component={TandaQuesos} />
      <ErrorBoundaryRoute path={`${match.url}tipo-de-queso`} component={TipoDeQueso} />
      <ErrorBoundaryRoute path={`${match.url}salidas-de-almacen`} component={SalidasDeAlmacen} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
