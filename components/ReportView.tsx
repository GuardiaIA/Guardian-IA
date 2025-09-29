// components/ReportView.tsx
import React from 'react';
import { jsPDF } from 'jspdf';
import { ReportData, RiskLevel, User } from '../types';

interface ReportViewProps {
  report: ReportData;
  onBack: () => void;
}

const getRiskLevelStyles = (riskLevel?: RiskLevel) => {
  switch (riskLevel) {
    case RiskLevel.Verde:
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        label: 'Verde / Seguro',
        color: '#166534'
      };
    case RiskLevel.Amarillo:
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        label: 'Amarillo / Precaución',
        color: '#854d0e'
      };
    case RiskLevel.Rojo:
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        label: 'Rojo / Peligro',
        color: '#991b1b'
      };
    default:
        return {
            bgColor: 'bg-slate-100',
            textColor: 'text-slate-800',
            label: 'Indeterminado',
            color: '#1e293b'
        };
  }
};

const ReportSection: React.FC<{title: string; content?: string | null, children?: React.ReactNode}> = ({ title, content, children }) => (
    <div>
        <h3 className="font-semibold text-slate-800 mb-2 pb-2 border-b border-slate-200 text-base">
            {title}
        </h3>
        {content && <p className="text-slate-600 text-sm leading-6 whitespace-pre-wrap">{content}</p>}
        {children}
    </div>
);

const UserDetail: React.FC<{label: string; value?: string}> = ({ label, value }) => (
    <div className="text-sm">
        <span className="font-semibold text-slate-600">{label}: </span>
        <span className="text-slate-800">{value}</span>
    </div>
)

const ReportView: React.FC<ReportViewProps> = ({ report, onBack }) => {
    const { bgColor, textColor, label, color } = getRiskLevelStyles(report.riskLevel);

    const handleDownloadPdf = async () => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const contentWidth = pageWidth - margin * 2;
        let y = margin;
        let pageCount = 1;

        const addWatermark = () => {
            const originalFontSize = doc.getFontSize();
            doc.setFontSize(80);
            doc.setTextColor(230, 230, 230);
            doc.text('Guardián IA', pageWidth / 2, pageHeight / 2, { align: 'center', angle: -45 });
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(originalFontSize);
        };
        
        addWatermark();

        // Header
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text("Informe Oficial de Riesgos", margin, y);
        y += 10;
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 10;
        
        // Report Details
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const reportDetails = [
            ["Número de Trámite:", report.id || 'N/A'],
            ["Fecha y Hora:", report.date ? new Date(report.date).toLocaleString() : 'N/A'],
            ["Ubicación:", report.location || 'N/A'],
            ["Estado:", "Abierta"]
        ];

        reportDetails.forEach(([label, value]) => {
            doc.setFont('helvetica', 'bold');
            doc.text(label, margin, y);
            doc.setFont('helvetica', 'normal');
            doc.text(value, margin + 50, y);
            y += 7;
        });

        y += 5; // Extra space
        
        // User Details Section
        if(report.user){
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text("Usuario que Reporta", margin, y);
            y += 5;
            doc.setLineWidth(0.2);
            doc.line(margin, y, pageWidth - margin, y);
            y += 7;
            
            doc.setFontSize(10);
            const userDetails = [
                ["Nombre:", report.user.name],
                ["Rol:", report.user.role],
                ["DNI:", report.user.dni],
                ["Correo Electrónico:", report.user.email]
            ];

             userDetails.forEach(([label, value]) => {
                doc.setFont('helvetica', 'bold');
                doc.text(label, margin, y);
                doc.setFont('helvetica', 'normal');
                doc.text(value, margin + 50, y);
                y += 7;
            });
             y += 5;
        }

        // Risk Level
        doc.setFont('helvetica', 'bold');
        doc.text("Nivel de Riesgo:", margin, y);
        doc.setTextColor(color);
        doc.text(label, margin + 50, y);
        doc.setTextColor(0,0,0);
        y += 15;

        // Image
        if (report.imageUrl) {
            try {
                const img = new Image();
                img.src = report.imageUrl;
                await new Promise(resolve => img.onload = resolve);
                const imgProps = doc.getImageProperties(img);
                const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
                if (y + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                    pageCount++;
                    addWatermark();
                }
                doc.addImage(img, 'JPEG', margin, y, contentWidth, imgHeight);
                y += imgHeight + 10;
            } catch (e) {
                console.error("Error adding image to PDF:", e);
                const errorText = "No se pudo cargar la imagen.";
                doc.setFont('helvetica', 'italic');
                doc.text(errorText, margin, y);
                y += 10;
            }
        }
        
        // Sections
        const sections = [
            { title: "Descripción de la Anomalía", content: report.anomalyDescription },
            { title: "Recomendación de EPP", content: report.ppeRecommendation },
            { title: "Sugerencia de Infraestructura", content: report.infrastructureSuggestion },
            { title: "Referencia Legal (Dec. 351/79)", content: report.legalReference },
        ];
        
        doc.setFont('helvetica', 'normal');

        sections.forEach(section => {
            if (y > pageHeight - margin - 20) { // Check for space before adding section
                doc.addPage();
                y = margin;
                pageCount++;
                addWatermark();
            }
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(section.title, margin, y);
            y += 5;
            doc.setLineWidth(0.2);
            doc.line(margin, y, pageWidth - margin, y);
            y += 7;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const splitText = doc.splitTextToSize(section.content, contentWidth);
            
            splitText.forEach((line: string) => {
                if (y > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                    pageCount++;
                    addWatermark();
                }
                doc.text(line, margin, y);
                y += 5;
            });
            y += 5; // Space after section
        });

        // Finalize footers after all pages are created
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            const footerText = `Página ${i} de ${pageCount} | Documento generado por Guardián IA`;
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }


        doc.save(`Informe-Guardián-IA-${report.id || 'NUEVO'}.pdf`);
    };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
             Volver al Historial
          </button>
          <h2 className="text-2xl font-bold text-slate-800">Informe de Riesgo de Seguridad</h2>
          {report.location && report.date && (
            <p className="text-slate-500 mt-1">
                {report.location} &bull; {new Date(report.date).toLocaleString()}
            </p>
          )}
        </div>
        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${bgColor} ${textColor}`}>
          {label}
        </div>
      </div>
      
      <div className="space-y-6">
        {report.imageUrl && <img src={report.imageUrl} alt="Evidencia" className="rounded-lg object-cover w-full max-h-[400px] shadow-md border" />}
        
        {report.user && (
            <ReportSection title="Usuario que Reporta">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <UserDetail label="Nombre" value={report.user.name} />
                    <UserDetail label="Rol" value={report.user.role} />
                    <UserDetail label="DNI" value={report.user.dni} />
                    <UserDetail label="Email" value={report.user.email} />
                </div>
            </ReportSection>
        )}

        <ReportSection title="Anomalías Detectadas" content={report.anomalyDescription} />
        <ReportSection title="EPP Recomendado" content={report.ppeRecommendation} />
        <ReportSection title="Sugerencias de Infraestructura" content={report.infrastructureSuggestion} />
        <ReportSection title="Fundamento Legal" content={report.legalReference} />
      </div>

       <div className="mt-8 pt-6 border-t border-slate-200 text-right">
            <button onClick={handleDownloadPdf} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Descargar PDF
            </button>
       </div>
    </div>
  );
};

export default ReportView;