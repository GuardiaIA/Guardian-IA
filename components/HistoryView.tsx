// components/HistoryView.tsx
import React, { useMemo } from 'react';
import { ReportData, RiskLevel, User, HierarchicalRole } from '../types';

interface HistoryViewProps {
  currentUser: User;
  reports: ReportData[];
  onSelectReport: (report: ReportData) => void;
}

const getRiskLevelStyles = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.Verde:
        return 'bg-green-100 text-green-800';
      case RiskLevel.Amarillo:
        return 'bg-yellow-100 text-yellow-800';
      case RiskLevel.Rojo:
        return 'bg-red-100 text-red-800';
      default:
          return 'bg-slate-100 text-slate-800';
    }
  };

const riskLevelLabels: Record<RiskLevel, string> = {
    [RiskLevel.Rojo]: 'Rojo / Peligro',
    [RiskLevel.Amarillo]: 'Amarillo / Precaución',
    [RiskLevel.Verde]: 'Verde / Seguro',
};

const HistoryView: React.FC<HistoryViewProps> = ({ currentUser, reports, onSelectReport }) => {
  const filteredReports = useMemo(() => {
    if (currentUser.role === HierarchicalRole.Director || currentUser.role === HierarchicalRole.Autoridades) {
        return reports;
    }
    return reports.filter(report => report.user?.id === currentUser.id);
  }, [currentUser, reports]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Historial de Informes</h2>
      <p className="text-slate-500 mb-8">
        Revisa los informes de seguridad generados. Tus permisos determinan los informes que puedes ver.
      </p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nº Trámite</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nivel de Riesgo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredReports.map((report) => {
              const riskStyles = getRiskLevelStyles(report.riskLevel);
              return (
                <tr key={report.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{report.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">{new Date(report.date!).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${riskStyles}`}>
                      {riskLevelLabels[report.riskLevel]}
                    </span>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{report.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => onSelectReport(report)} className="text-blue-600 hover:text-blue-900">
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredReports.length === 0 && <p className="text-center py-8 text-slate-500">No hay informes para mostrar.</p>}
      </div>
    </div>
  );
};

export default HistoryView;
