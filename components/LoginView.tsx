import React, { useState } from 'react';
import { User, HierarchicalRole } from '../types';

interface LoginViewProps {
  onLogin: (email: string, password: string) => User | null;
  onAddNewUser: (user: Omit<User, 'id' | 'avatarUrl'>) => { success: boolean, message: string };
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onAddNewUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [role, setRole] = useState<HierarchicalRole>(HierarchicalRole.PersonalDeServicio);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = onLogin(email, password);
    if (!user) {
      setError('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      if(!name || !dni || !email || !password || !role) {
          setError('Todos los campos son obligatorios.');
          return;
      }
      const result = onAddNewUser({ name, dni, email, password, role });
      if (result.success) {
          setSuccess(result.message + " Ahora puede iniciar sesión.");
          setIsRegistering(false);
          // Clear form
          setName('');
          setDni('');
          setEmail('');
          setPassword('');
          setRole(HierarchicalRole.PersonalDeServicio);
      } else {
          setError(result.message);
      }
  }

  const toggleView = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccess('');
    // Clear fields on view toggle
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h1 className="text-3xl font-bold text-slate-800">Guardián IA</h1>
          </div>
          <p className="text-slate-500">{isRegistering ? 'Cree una nueva cuenta' : 'Inicie sesión para continuar'}</p>
        </div>

        {isRegistering ? (
          // Registration Form
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Fields for name, dni, email, password, role */}
            <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            <input type="text" placeholder="DNI" value={dni} onChange={e => setDni(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            <select value={role} onChange={e => setRole(e.target.value as HierarchicalRole)} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm">
                {Object.values(HierarchicalRole).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700">Crear Cuenta</button>
            <p className="text-center text-sm">
              ¿Ya tiene una cuenta? <button type="button" onClick={toggleView} className="font-medium text-blue-600 hover:underline">Iniciar sesión</button>
            </p>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            {success && <p className="text-center text-sm text-green-600">{success}</p>}
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700">Ingresar</button>
            <p className="text-center text-sm">
              ¿No tiene una cuenta? <button type="button" onClick={toggleView} className="font-medium text-blue-600 hover:underline">Crear una ahora</button>
            </p>
          </form>
        )}
      </div>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>
            {/* We could add a link to the user guide here as well */}
            &copy; {new Date().getFullYear()} Guardián IA. Un entorno de trabajo más seguro.
        </p>
      </footer>
    </div>
  );
};

export default LoginView;