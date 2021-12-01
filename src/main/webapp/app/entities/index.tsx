import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Leches from './leches';
import Cisternas from './cisternas';
import FrascosDeFermentos from './frascos-de-fermentos';
import TandaQuesos from './tanda-quesos';
import TipoDeQueso from './tipo-de-queso';
import MovimientosAlmacen from './movimientos-almacen';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <PrivateRoute path={`${match.url}leches`} component={Leches} hasAnyAuthorities={[AUTHORITIES.RECEPTIONIST, AUTHORITIES.ADMIN]} />
      <PrivateRoute path={`${match.url}cisternas`} component={Cisternas} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute
        path={`${match.url}frascos-de-fermentos`}
        component={FrascosDeFermentos}
        hasAnyAuthorities={[AUTHORITIES.LABORATORY, AUTHORITIES.ADMIN]}
      />
      <PrivateRoute
        path={`${match.url}tanda-quesos`}
        component={TandaQuesos}
        hasAnyAuthorities={[AUTHORITIES.PRODUCTION, AUTHORITIES.ADMIN]}
      />
      <PrivateRoute path={`${match.url}tipo-de-queso`} component={TipoDeQueso} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path={`${match.url}movimientos-almacen`} component={MovimientosAlmacen} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
