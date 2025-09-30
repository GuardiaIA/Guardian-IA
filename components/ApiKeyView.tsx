import React, { useState } from 'react';

interface ApiKeyViewProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyView: React.FC<ApiKeyViewProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Bienvenido a Guardián IA</h1>
        <p className="text-slate-500 mt-2 mb-6">Para comenzar, por favor ingrese su clave de API de Google Gemini.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Pegue su clave de API aquí"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            aria-label="API Key Input"
          />
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed" disabled={!apiKey.trim()}>
            Guardar y Continuar
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-4">
          Puede obtener su clave de API en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a>.
          Su clave se guardará en la sesión de su navegador y no se compartirá.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyView;
