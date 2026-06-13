import React, { useCallback, useEffect, useState } from 'react';
import logo from '../assets/imgs/logo.png';

const BACKEND_URL = 'https://backend-capocannoniere-env.eba-9sdjrvpx.us-east-2.elasticbeanstalk.com';
const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? BACKEND_URL : '');

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'menu', label: 'Menú' },
  { id: 'acerca', label: 'Quiénes somos' },
];

async function obtenerPlatos() {
  const response = await fetch(`${API_URL}/api/platos`);
  if (!response.ok) {
    throw new Error('No se pudieron cargar los platos');
  }
  return response.json();
}

async function crearPlato(datos) {
  const response = await fetch(`${API_URL}/api/platos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const mensaje = typeof error?.detail === 'string' ? error.detail : 'No se pudo agregar el plato';
    throw new Error(mensaje);
  }
  return response.json();
}

async function eliminarPlato(id) {
  const response = await fetch(`${API_URL}/api/platos/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('No se pudo eliminar el plato');
  }
  return response.json();
}

async function editarPlato(id, datos) {
  const response = await fetch(`${API_URL}/api/platos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!response.ok) {
    throw new Error('No se pudo editar el plato');
  }
  return response.json();
}

async function cambiarEstadoPlato(id) {
  const response = await fetch(`${API_URL}/api/platos/${id}/estado`, { method: 'PATCH' });
  if (!response.ok) {
    throw new Error('No se pudo cambiar el estado del plato');
  }
  return response.json();
}

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

function PlatoForm({ plato, onSave, onCancel, esNuevo = false }) {
  const [id, setId] = useState(plato?.id || '');
  const [nombre, setNombre] = useState(plato?.nombre || '');
  const [precio, setPrecio] = useState(plato?.precio || '');
  const [descripcion, setDescripcion] = useState(plato?.descripcion?.join('\n') || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const datos = {
      nombre,
      precio,
      descripcion: descripcion.split('\n').map((linea) => linea.trim()).filter(Boolean),
    };
    if (esNuevo) {
      onSave({ id: id.trim().toLowerCase().replace(/\s+/g, '-'), ...datos });
      return;
    }
    onSave(datos);
  };

  return (
    <form className="plato-form" onSubmit={handleSubmit}>
      {esNuevo && (
        <label>
          Identificador (sin espacios)
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="ej: carbonara"
            required
          />
        </label>
      )}
      <label>
        Nombre
        <input value={nombre} onChange={(event) => setNombre(event.target.value)} required />
      </label>
      <label>
        Precio
        <input value={precio} onChange={(event) => setPrecio(event.target.value)} placeholder="$25" required />
      </label>
      <label>
        Descripción (una línea por ítem)
        <textarea value={descripcion} onChange={(event) => setDescripcion(event.target.value)} required />
      </label>
      <div className="plato-actions">
        <button className="boton" type="submit">
          {esNuevo ? 'Agregar plato' : 'Guardar cambios'}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

function GestionMenu({
  platos,
  error,
  cargando,
  onRecargar,
  onAgregar,
  onEditar,
  onEliminar,
  onCambiarEstado,
}) {
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const handleAgregar = async (datos) => {
    await onAgregar(datos);
    setMostrarFormularioNuevo(false);
  };

  const handleEditar = async (id, datos) => {
    await onEditar(id, datos);
    setEditandoId(null);
  };

  return (
    <section className="menu-admin page">
      <div className="container">
        <h2>Gestión del menú</h2>
        <p className="menu-admin-desc">
          Desde aquí puedes agregar, editar, eliminar platos y cambiar su disponibilidad.
        </p>

        {error && (
          <div className="menu-admin-alert">
            <p className="menu-error">{error}</p>
            <p className="menu-admin-hint">
              Asegúrate de tener el backend en ejecución:{' '}
              <code>uvicorn main:app --reload</code> en la carpeta <code>backend</code>.
            </p>
            <button className="boton" type="button" onClick={onRecargar}>
              Reintentar conexión
            </button>
          </div>
        )}

        {!mostrarFormularioNuevo && (
          <button className="boton" type="button" onClick={() => setMostrarFormularioNuevo(true)}>
            + Agregar plato
          </button>
        )}

        {mostrarFormularioNuevo && (
          <div className="menu-admin-card">
            <h3>Nuevo plato</h3>
            <PlatoForm
              esNuevo
              plato={null}
              onSave={handleAgregar}
              onCancel={() => setMostrarFormularioNuevo(false)}
            />
          </div>
        )}

        {cargando ? (
          <p>Cargando platos...</p>
        ) : (
          <div className="menu-admin-lista">
            {platos.length === 0 ? (
              <p>No hay platos registrados. Usa el botón &quot;Agregar plato&quot; para crear uno.</p>
            ) : (
              platos.map((plato) => (
                <article className="menu-admin-card" key={plato.id}>
                  {editandoId === plato.id ? (
                    <>
                      <h3>Editar: {plato.nombre}</h3>
                      <PlatoForm
                        plato={plato}
                        onSave={(datos) => handleEditar(plato.id, datos)}
                        onCancel={() => setEditandoId(null)}
                      />
                    </>
                  ) : (
                    <>
                      <div className="menu-admin-card-header">
                        <div>
                          <h3>{plato.nombre}</h3>
                          <p className="menu-admin-id">ID: {plato.id}</p>
                        </div>
                        <span className={`estado-plato estado-${plato.estado}`}>
                          {plato.estado === 'disponible' ? 'Disponible' : 'Agotado'}
                        </span>
                      </div>
                      <ul className="menu-admin-descripcion">
                        {plato.descripcion.map((linea) => (
                          <li key={linea}>{linea}</li>
                        ))}
                      </ul>
                      <p className="precio">Precio: {plato.precio}</p>
                      <div className="plato-actions">
                        <button className="boton" type="button" onClick={() => setEditandoId(plato.id)}>
                          Editar
                        </button>
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() => onCambiarEstado(plato.id)}
                        >
                          {plato.estado === 'disponible' ? 'Marcar agotado' : 'Marcar disponible'}
                        </button>
                        <button className="btn btn-danger" type="button" onClick={() => onEliminar(plato.id)}>
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Menu() {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarPlatos = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const data = await obtenerPlatos();
      setPlatos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPlatos();
  }, [cargarPlatos]);

  const handleAgregar = async (datos) => {
    try {
      const platoNuevo = await crearPlato(datos);
      setPlatos((prev) => [...prev, platoNuevo]);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Deseas eliminar este plato del menú?')) {
      return;
    }
    try {
      await eliminarPlato(id);
      setPlatos((prev) => prev.filter((plato) => plato.id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditar = async (id, datos) => {
    try {
      const platoActualizado = await editarPlato(id, datos);
      setPlatos((prev) => prev.map((plato) => (plato.id === id ? platoActualizado : plato)));
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleCambiarEstado = async (id) => {
    try {
      const platoActualizado = await cambiarEstadoPlato(id);
      setPlatos((prev) => prev.map((plato) => (plato.id === id ? platoActualizado : plato)));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <GestionMenu
        platos={platos}
        error={error}
        cargando={cargando}
        onRecargar={cargarPlatos}
        onAgregar={handleAgregar}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onCambiarEstado={handleCambiarEstado}
      />

      {!cargando && platos.length > 0 && (
        <>
          <section className="page">
            <div className="container">
              <h2>Vista del menú</h2>
            </div>
          </section>
          {platos.map((plato) => (
            <section
              className={`plato ${plato.estado === 'agotado' ? 'plato-agotado' : ''}`}
              id={plato.id}
              key={plato.id}
            >
              <div className="container split">
                <div className="imagen" aria-hidden="true"></div>
                <div className="texto">
                  <h1>{plato.nombre}</h1>
                  <p className={`estado-plato estado-${plato.estado}`}>
                    {plato.estado === 'disponible' ? 'Disponible' : 'Agotado'}
                  </p>
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
        </>
      )}
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
