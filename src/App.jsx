import { useState } from 'react';
import logo from '../assets/imgs/logo.png';

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'menu', label: 'Menú' },
  { id: 'reservas', label: 'Reservar' },
  { id: 'acerca', label: 'Quiénes somos' },
];

const platos = [
  {
    id: 'rossonero',
    nombre: 'Il rossonero',
    descripcion: ['Risotto alla Milanese con ossobuco', 'Vino tinto Chianti Classico', 'Tiramisú tradicional'],
    precio: '$25',
  },
  {
    id: 'nerazzurro',
    nombre: 'Il nerazzurro',
    descripcion: ['Risotto al nero di seppia', 'Café espresso', 'Panacotta con frutos rojos'],
    precio: '$25',
  },
  {
    id: 'bianconero',
    nombre: 'La vecchia signora',
    descripcion: ['Tajarin al tartufo bianco', 'Barolo', 'Bonet piemontese'],
    precio: '$25',
  },
];

function Header({ activePage, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container">
        <button className="logo" type="button" onClick={() => onNavigate('inicio')} aria-label="Ir al inicio">
          <img src={logo} alt="Logotipo Il Capocannoniere" />
        </button>
        <nav aria-label="Navegación principal">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={activePage === item.id ? 'active' : ''}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="footer">&copy; 2026 Il Capocannoniere</p>
        <p className="footer">“Donde cada gol se celebra con un buen plato de pasta.”</p>
      </div>
    </footer>
  );
}

function Inicio({ onNavigate }) {
  return (
    <main>
      <section id="hero">
        <div className="container">
          <h1>Cucina italiana dal cuore</h1>
          <p>
            En Il Capocannoniere celebramos lo mejor de la tradición italiana: pasión, sabor y autenticidad.
            Nuestro restaurante combina un ambiente cálido y familiar con platos preparados al estilo clásico,
            desde pastas frescas hechas a mano hasta pizzas artesanales con ingredientes de primera calidad.
          </p>
          <p>
            Inspirado en el espíritu del fútbol italiano y en las glorias que marcaron una época, cada visita es
            una experiencia donde la gastronomía y la cultura se unen para hacerte sentir en el corazón de Italia.
          </p>
          <button className="boton" type="button" onClick={() => onNavigate('menu')}>
            Ver menú
          </button>
        </div>
      </section>

      <section id="contexto">
        <div className="container split">
          <div className="imagen" aria-hidden="true"></div>
          <div className="texto">
            <h2>
              <span className="color-letra1">3 años de</span> Cucina <span className="color-letra2">e Calcio</span>
            </h2>
            <p>
              La idea nació de una pasión compartida por la gastronomía italiana y el fútbol. El fundador,
              inspirado en Roberto Baggio y en la cultura de los capocannonieri, abrió un restaurante que une dos
              símbolos de Italia: la buena mesa y el deporte.
            </p>
            <button className="boton" type="button" onClick={() => onNavigate('acerca')}>
              Conócenos
            </button>
          </div>
        </div>
      </section>

      <section id="ubicacion">
        <div className="container">
          <h2>La vita italiana a Manta</h2>
          <p>
            Disfruta il sapore della vera cucina e calcio italiano en Il Capocannoniere, ubicado en Calle 13 Av.
            24, Manta, Ecuador.
          </p>
        </div>
      </section>
    </main>
  );
}

function Menu() {
  return (
    <main>
      {platos.map((plato) => (
        <section className="plato" id={plato.id} key={plato.id}>
          <div className="container split">
            <div className="imagen" aria-hidden="true"></div>
            <div className="texto">
              <h1>{plato.nombre}</h1>
              <p>
                {plato.descripcion.map((linea) => (
                  <span key={linea}>
                    {linea}
                    <br />
                  </span>
                ))}
              </p>
              <p className="precio">Precio: {plato.precio}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

function Reservas() {
  return (
    <main className="container page">
      <h1>
        <span className="color-letra1">Con</span>ta<span className="color-letra2">cto</span>
      </h1>

      <section aria-labelledby="pedido-title" id="pedido">
        <h2 id="pedido-title">
          <span className="color-letra1">Reali</span>zar re<span className="color-letra2">serva</span>
        </h2>

        <form action="mailto:servicios@ilcapocannoniere.com" method="post" encType="text/plain">
          <label htmlFor="nombre">Nombre completo</label>
          <input id="nombre" name="Nombre" type="text" required />

          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="Email" type="email" required />

          <label htmlFor="mensaje">Fecha y hora</label>
          <textarea id="mensaje" name="Mensaje" required />

          <button type="submit" className="btn">
            Enviar
          </button>
        </form>
        <p id="contacto-alt">
          También puedes escribirnos a <a href="mailto:servicios@ilcapocannoniere.com">servicios@ilcapocannoniere.com</a>
        </p>
      </section>

      <section id="soporte" aria-labelledby="soporte-title">
        <h2 id="soporte-title">
          <span className="color-letra1">Sop</span>o<span className="color-letra2">rte</span>
        </h2>
        <p>Teléfono: +593 963996287</p>
      </section>
    </main>
  );
}

function Acerca() {
  return (
    <main>
      <section id="acerca-hero">
        <div className="container">
          <h1>
            <span className="color-letra1">¿Qué es I</span>l Capocan<span className="color-letra2">noniere?</span>
          </h1>
          <p>
            Il Capocannoniere es un ristorante donde celebramos lo mejor de la tradición italiana: pasión, sabor y
            autenticidad, tratando de juntarla a la cultura mantense.
          </p>
          <p>
            Nuestro restaurante combina un ambiente cálido y familiar con platos preparados al estilo clásico, desde
            pastas frescas hechas a mano hasta pizzas artesanales con ingredientes de primera calidad.
          </p>
        </div>
      </section>

      <section id="historia">
        <div className="container">
          <h2>
            <span className="color-letra1">Tray</span>ect<span className="color-letra2">oria</span>
          </h2>
          <p>
            La idea nació de una pasión compartida por la gastronomía italiana y el fútbol. El fundador, inspirado en
            la figura legendaria de Roberto Baggio y en la cultura de los capocannonieri, decidió abrir un restaurante
            que uniera dos símbolos de Italia: la buena mesa y el deporte.
          </p>
          <p>
            En su tercer año, Il Capocannoniere se ha establecido como un referente gastronómico local, conocido por
            su autenticidad, ambiente acogedor y servicio cálido.
          </p>
        </div>
      </section>

      <section id="contacto">
        <div className="container">
          <h2>
            <span className="color-letra1">Cont</span>áct<span className="color-letra2">anos</span>
          </h2>
          <p>
            Whatsapp: 0963996287
            <br />
            Correo electrónico: servicios@ilcapocannoniere.com
            <br />
            Dirección: Calle 13 Av. 24, Manta, Ecuador
            <br />
            Instagram: @ilcapocannoniere_manta
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('inicio');

  const pages = {
    inicio: <Inicio onNavigate={setActivePage} />,
    menu: <Menu />,
    reservas: <Reservas />,
    acerca: <Acerca />,
  };

  return (
    <>
      <Header activePage={activePage} onNavigate={setActivePage} />
      {pages[activePage]}
      <Footer />
    </>
  );
}
