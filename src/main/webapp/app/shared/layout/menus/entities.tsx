import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" data-cy="entity" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/leches">
      Leches
    </MenuItem>
    <MenuItem icon="asterisk" to="/cisternas">
      Cisternas
    </MenuItem>
    <MenuItem icon="asterisk" to="/frascos-de-fermentos">
      Frascos De Fermentos
    </MenuItem>
    <MenuItem icon="asterisk" to="/tanda-quesos">
      Tanda Quesos
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-de-queso">
      Tipo De Queso
    </MenuItem>
    <MenuItem icon="asterisk" to="/salidas-de-almacen">
      Salidas De Almacen
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
