import React from 'react';
import { CHEMICAL_GUIDE_DATA } from '../constants';

const ChemicalGuideView: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Guía de Químicos</h2>
      <p className="text-slate-500 mb-8">
        Información de seguridad clave sobre sustancias químicas de uso controlado.
      </p>

      <div className="space-y-12">
        {CHEMICAL_GUIDE_DATA.map((group) => (
          <section key={group.title}>
            <h3 className="text-xl font-semibold text-slate-700 mb-6 pb-3 border-b border-slate-200">
              {group.title}
            </h3>
            <div className="space-y-8">
              {group.chemicals.map((chemical) => (
                <div key={chemical.name} className="bg-slate-50/50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-lg font-bold text-slate-800">{chemical.name}</h4>
                  <p className="mt-2 text-slate-600 leading-relaxed">{chemical.description}</p>
                  
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        EPP Recomendado
                      </h5>
                      <p className="text-slate-600 text-sm leading-6">{chemical.epp}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                         </svg>
                         Primeros Auxilios
                      </h5>
                       <p className="text-slate-600 text-sm leading-6">{chemical.firstAid}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ChemicalGuideView;
