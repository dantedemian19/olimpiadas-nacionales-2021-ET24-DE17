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
          <div className="raya" style={{ width: '20.5%' }}></div>
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
        <div style={{ backgroundColor: '#f6f6f6', width: '100vw' }}>
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
                    {/* <h5 className="color-1">Infografia 1</h5> */}
                    <p>Recepción y tratamiento de la leche</p>
                  </div>
                  <div className="inforgraphic-box info-pos-2">
                    {/* <h5 className="color-2">Infografia 2</h5> */}
                    <p>Agregado de fermentos y aditivos</p>
                  </div>
                  <div className="inforgraphic-box info-pos-3">
                    {/* <h5 className="color-3">Infografia 3</h5> */}
                    <p>Coagulación de la leche y manejo de la cuajada</p>
                  </div>
                  <div className="inforgraphic-box info-pos-4">
                    {/* <h5 className="color-4">Infografia 4</h5> */}
                    <p>Desuerado y preprensado bajo suero</p>
                  </div>
                  <div className="inforgraphic-box info-pos-5">
                    {/* <h5 className="color-5">Infografia 5</h5> */}
                    <p>Moldeo y prensado</p>
                  </div>
                  <div className="inforgraphic-box info-pos-6">
                    {/* <h5 className="color-6">Infografia 6</h5> */}
                    <p>Salado por inmersión en salmuera</p>
                  </div>
                  <div className="inforgraphic-box info-pos-7">
                    {/* <h5 className="color-7">Infografia 7</h5> */}
                    <p>Maduración del queso y conservación</p>
                  </div>
                  <div className="inforgraphic-box info-pos-8">
                    {/* <h5 className="color-8">Infografia 8</h5> */}
                    <p>Envasado y etiquetado</p>
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
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
              Sobre nosotros
            </a>
          </div>
          <div className="sectorCent">
            <h1>C-CHEESE</h1>
            <div className="redes">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
                <img src="../../../content/images/instagram.png" alt="instagram" />
              </a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
                <img src="../../../content/images/facebook.png" alt="facebook" />
              </a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
                <img src="../../../content/images/twitter.png" alt="twitter" />
              </a>
            </div>
            <div className="lineVert"></div>
            <p className="copy">© 2021</p>
          </div>
          <div className="sectorDer">
            <div className="lineHori"></div>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
              Terminos y condiciones
            </a>
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
