import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PerfilUsuario() {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/notificaciones');

        if (Array.isArray(data)) {
          setNotificaciones(data);
        } else if (Array.isArray(data.notificaciones)) {
          setNotificaciones(data.notificaciones);
        } else {
          console.warn('Formato de notificaciones inesperado:', data);
          setNotificaciones([]);
        }
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        setNotificaciones([]);
      }
    };

    obtenerNotificaciones();
    const intervalo = setInterval(obtenerNotificaciones, 10000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-sky-100 to-lime-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 drop-shadow">🎉 ¡Hola, pequeño/a deportista!</h1>

      <div className="grid grid-cols-2 gap-5 w-full max-w-md">
        <button
          onClick={() => navigate('/ejercicios-por-edad')}
          className="bg-sky-300 hover:bg-sky-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          🏃‍♂️ Ejercicios
        </button>
        <button
          onClick={() => navigate('/progreso')}
          className="bg-green-300 hover:bg-green-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          📈 Progreso
        </button>
        <button
          onClick={() => navigate('/recompensas')}
          className="bg-yellow-300 hover:bg-yellow-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          ⭐ Recompensas
        </button>
        <button
          onClick={() => navigate('/consejos')}
          className="bg-purple-300 hover:bg-purple-400 text-white py-3 px-4 rounded-2xl shadow-lg text-lg flex items-center justify-center gap-2"
        >
          💡 Consejos
        </button>
      </div>

      <div className="mt-12 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">🔔 Tus notificaciones</h2>
        <ul className="space-y-3">
          {notificaciones.length > 0 ? (
            notificaciones.map((n) => (
              <li
                key={n._id || n.id}
                className="bg-white border-l-8 border-blue-300 p-4 rounded-xl shadow text-blue-700 font-medium"
              >
                📢 {n.mensaje}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic text-center">No tienes notificaciones por ahora 😊</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PerfilUsuario;
