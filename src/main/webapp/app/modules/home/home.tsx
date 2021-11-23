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
            <div className="container">
              <div className="carta">
                <div className="contenido">
                  <h2>01</h2>
                  {/* <h1>Paso uno</h1> */}
                  <h3>Recepción y tratamiento previo de la leche</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>02</h2>
                  {/* <h1>Paso dos</h1> */}
                  <h3>Agregado de fermentos</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>03</h2>
                  {/* <h1>Paso tres</h1> */}
                  <h3>Agregado de Aditivos</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>04</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Coagulación de la leche</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>05</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Manejo de la cuajada</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>06</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Desuerado y preprensado bajo suero</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>07</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Moldeo y prensado</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>08</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Salado por inmersión en salmuera</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>09</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Maduración del queso</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>10</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Conservación</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
              <div className="carta">
                <div className="contenido">
                  <h2>11</h2>
                  {/* <h1>Paso cuatro</h1> */}
                  <h3>Envasado y etiquetado</h3>
                  {/* <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis delectus esse ipsam nesciunt, vitae beatae
                  similique voluptate, sequi animi veritatis sed qui libero cumque voluptatibus quam aliquid architecto culpa!
                </p> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="animals">
          <h1>C-CHEESE</h1>
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
