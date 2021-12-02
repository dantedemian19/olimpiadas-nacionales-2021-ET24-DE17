import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row style={{ marginTop: '-15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <section>
        <div className="banner">
          <div className="card-home">
            <h1 className="titulo">C-CHEESE</h1>
            <p className="parrafo">Fabricacion de queso de la mejor calidad.</p>
          </div>
        </div>
      </section>
      <main className="main-home">
        <section className="que-es">
          <h1>¿Que es el queso?</h1>
          <div className="raya" style={{ width: '280px' }}></div>
          <p>
            El queso es un alimento sólido que se obtiene por maduración de la cuajada de la leche animal o vegetal una vez eliminado el
            suero; sus diferentes variedades dependen del origen de la leche empleada, de los métodos de elaboración seguidos y del grado de
            madurez alcanzada. Puede surgir a partir de la leche cuajada de vaca, cabra, oveja, búfala, camella, mamíferos rumiantes o leche
            vegetal.
          </p>
          <p>
            Las bacterias beneficiosas se encargan de acidificar la leche, y tienen también un papel importante en la definición de la
            textura y el sabor de la mayoría de los quesos. Algunos también contienen mohos, tanto en la superficie exterior como en el
            interior.
          </p>
        </section>
        <div style={{ backgroundColor: '#f6f6f6', width: '105vw' }}>
          <section className="pasos">
            <h1>Pasos a seguir para la elaboración del queso</h1>
            <div className="main-container" style={{ position: 'relative', top: '25px' }}>
              <div className="container-inner">
                <div className="container-inner-img">
                  <img src="../../../content/images/circle-img.png" alt="" />
                  <ul className="steps">
                    <li className="text-style pos-1">
                      PASO <span>01</span>
                    </li>
                    <li className="text-style pos-2">
                      PASO <span>02</span>
                    </li>
                    <li className="text-style pos-3">
                      PASO <span>03</span>
                    </li>
                    <li className="text-style pos-4">
                      PASO <span>04</span>
                    </li>
                    <li className="text-style pos-5">
                      PASO <span>05</span>
                    </li>
                    <li className="text-style pos-6">
                      PASO <span>06</span>
                    </li>
                    <li className="text-style pos-7">
                      PASO <span>07</span>
                    </li>
                    <li className="text-style pos-8">
                      PASO <span>08</span>
                    </li>
                  </ul>
                  <div className="inforgraphic-box info-pos-1">
                    <h5 className="color-1">Recepción y tratamiento de la leche</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-2">
                    <h5 className="color-2">Agregado de fermentos y aditivos</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-3">
                    <h5 className="color-3">Coagulación de la leche y manejo de la cuajada</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-4">
                    <h5 className="color-4">Desuerado y preprensado bajo suero</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-5">
                    <h5 className="color-5">Moldeo y prensado</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-6">
                    <h5 className="color-6">Salado por inmersión en salmuera</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-7">
                    <h5 className="color-7">Maduración del queso y conservación</h5>
                  </div>
                  <div className="inforgraphic-box info-pos-8">
                    <h5 className="color-8">Envasado y etiquetado</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="animals">
          <div className="sectorIzq">
            <div className="lineHori"></div>
          </div>
          <div className="sectorCent">
            <img src="../../../content/images/logo.png" alt="Logo" style={{ height: '100px', marginBottom: '15px' }} />
            <div className="lineVert"></div>
            <a href="../../../content/pdf/terminos-condiciones.pdf" download>
              Terminos y condiciones
            </a>
            <p className="copy">© 2021</p>
          </div>
          <div className="sectorDer">
            <div className="lineHori"></div>
          </div>
        </div>
      </footer>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
