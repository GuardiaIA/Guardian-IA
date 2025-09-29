// components/ScanView.tsx
import React, { useState } from 'react';
import CameraView from './CameraView';
import { analyzeImageForSafety } from '../services/geminiService';
import { ReportData, User, HierarchicalRole } from '../types';

interface ScanViewProps {
  currentUser: User;
  onReportGenerated: (report: ReportData) => void;
}

const ScanView: React.FC<ScanViewProps> = ({ currentUser, onReportGenerated }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = (file: File) => {
    setImageFile(file);
    setIsCameraOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };
  
  const handleAnalyze = async () => {
    if (!imageFile || !location) {
        setError("Por favor, suba una imagen e ingrese una ubicación.");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const report = await analyzeImageForSafety(imageFile, location);
      onReportGenerated({ 
          ...report, 
          imageUrl: URL.createObjectURL(imageFile), 
          location, 
          date: new Date().toISOString(),
          user: currentUser
        });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error desconocido.");
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser.role === HierarchicalRole.Autoridades) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <h2 className="text-xl font-bold text-slate-700">Función no disponible</h2>
            <p className="text-slate-500 mt-2">Su rol de 'Autoridades' es para fines de monitoreo y no tiene permisos para generar nuevos informes.</p>
        </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Analizar Nuevo Riesgo</h2>
      <p className="text-slate-500 mb-8">
        Capture o suba una foto del área para que la IA genere un informe de seguridad.
      </p>

      <div className="space-y-6">
        <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                Ubicación
            </label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Taller de carpintería, Sótano"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        
        <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center">
          {imageFile ? (
            <div>
              <img src={URL.createObjectURL(imageFile)} alt="Previsualización" className="max-h-60 mx-auto rounded-md"/>
              <p className="text-sm text-slate-500 mt-2">{imageFile.name}</p>
              <button onClick={() => setImageFile(null)} className="text-xs text-red-500 hover:underline mt-1">Quitar imagen</button>
            </div>
          ) : (
            <p className="text-slate-500">No se ha seleccionado ninguna imagen.</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="flex-1 px-4 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition"
          >
            Tomar Foto
          </button>
          <label className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition cursor-pointer text-center">
            Subir Archivo
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <button
            onClick={handleAnalyze}
            disabled={!imageFile || !location || isLoading}
            className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Analizando...' : 'Generar Informe'}
        </button>
      </div>

      {isCameraOpen && <CameraView onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />}
    </div>
  );
};

export default ScanView;
