import React, { useEffect } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { AUTHORITIES } from 'app/config/constants';

import { NavDropdown } from './menu-components';
import { useDispatch } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';

export type EntitiesMenuProps = StateProps;

export const EntitiesMenu = (props: StateProps) => {
  return (
    <NavDropdown icon="th-list" name="Entidades" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
      {props.account?.authorities.indexOf('ROLE_RECEPTIONIST') >= 0 || props.account?.authorities.indexOf('ROLE_ADMIN') >= 0 ? (
        <MenuItem icon="asterisk" to="/leches">
          Leches
        </MenuItem>
      ) : (
        ''
      )}
      {props.account?.authorities.indexOf('ROLE_ADMIN') >= 0 ? (
        <MenuItem icon="asterisk" to="/cisternas">
          Cisternas
        </MenuItem>
      ) : (
        ''
      )}
      {props.account?.authorities.indexOf('ROLE_LABORATORY') >= 0 || props.account?.authorities.indexOf('ROLE_ADMIN') >= 0 ? (
        <MenuItem icon="asterisk" to="/frascos-de-fermentos">
          Frascos De Fermentos
        </MenuItem>
      ) : (
        ''
      )}
      {props.account?.authorities.indexOf('ROLE_PRODUCTION') >= 0 || props.account?.authorities.indexOf('ROLE_ADMIN') >= 0 ? (
        <MenuItem icon="asterisk" to="/tanda-quesos">
          Tanda Quesos
        </MenuItem>
      ) : (
        ''
      )}
      {props.account?.authorities.indexOf('ROLE_ADMIN') >= 0 ? (
        <>
          <MenuItem icon="asterisk" to="/tipo-de-queso">
            Tipo De Queso
          </MenuItem>
          <MenuItem icon="asterisk" to="/movimientos-almacen">
            Movimientos Almacen
          </MenuItem>
        </>
      ) : (
        ''
      )}
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </NavDropdown>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;
