import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row style={{ marginTop: '-15px' }}>
      <section>
        <div className="banner">
          <div className="card-home">
            <h1 className="titulo">C-CHEESE</h1>
            <p className="parrafo">Fabricacion de queso de la mejor calidad.</p>
          </div>
        </div>
      </section>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
