// components/UserGuideView.tsx
import React from 'react';

const GuideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">{title}</h3>
        <div className="space-y-3 text-slate-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const UserGuideView: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Guía de Usuario</h2>
      <p className="text-slate-500 mb-8">
        Cómo utilizar la plataforma Guardián IA para garantizar un entorno de trabajo seguro.
      </p>

      <div className="prose prose-slate max-w-none">
          <GuideSection title="1. Analizar un Nuevo Riesgo">
              <p>
                  Esta es la función principal de la aplicación. Permite generar un informe de seguridad a partir de una imagen.
              </p>
              <ol>
                  <li>Navegue a la sección <strong>"Analizar Riesgo"</strong>.</li>
                  <li>Ingrese la ubicación específica del área a analizar (ej. "Taller de carpintería", "Sótano").</li>
                  <li>Tome una foto con la cámara del dispositivo o suba una imagen desde su galería. La foto debe ser clara y mostrar el posible riesgo.</li>
                  <li>Haga clic en <strong>"Generar Informe"</strong>. La IA analizará la imagen y creará un informe detallado en segundos.</li>
                  <li>Será redirigido al informe recién creado, donde podrá revisarlo y descargarlo en formato PDF.</li>
              </ol>
          </GuideSection>

          <GuideSection title="2. Historial de Informes">
              <p>
                  Consulte todos los informes de seguridad generados. La visibilidad de los informes depende de su rol:
              </p>
              <ul>
                  <li><strong>Director y Autoridades:</strong> Pueden ver todos los informes generados en la institución.</li>
                  <li><strong>Otros roles:</strong> Solo pueden ver los informes que ellos mismos han generado.</li>
              </ul>
              <p>
                  Haga clic en "Ver Detalles" para abrir un informe específico.
              </p>
          </GuideSection>

          <GuideSection title="3. Guía de Químicos">
              <p>
                  Una referencia rápida sobre el manejo seguro de sustancias químicas controladas. Contiene información sobre:
              </p>
              <ul>
                  <li>Descripción del químico y sus riesgos.</li>
                  <li>Equipo de Protección Personal (EPP) recomendado.</li>
                  <li>Procedimientos de primeros auxilios.</li>
              </ul>
          </GuideSection>

          <GuideSection title="4. Gestionar Usuarios (Solo Director)">
               <p>
                  Esta sección está restringida al rol de <strong>Director</strong>. Permite crear nuevas cuentas de usuario para el personal, asignando sus respectivos roles y credenciales de acceso.
              </p>
          </GuideSection>
          
           <GuideSection title="5. Roles de Usuario y Permisos">
               <p>El sistema tiene una estructura jerárquica de roles:</p>
               <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Director:</strong> Acceso total. Puede ver todos los informes y gestionar usuarios.</li>
                    <li><strong>Autoridades:</strong> Rol de supervisión. Puede ver todos los informes pero no puede generar nuevos ni gestionar usuarios.</li>
                    <li><strong>Intendente / Mayordomo / Personal de Servicio:</strong> Pueden generar y ver sus propios informes.</li>
                </ul>
           </GuideSection>
      </div>
    </div>
  );
};

export default UserGuideView;
