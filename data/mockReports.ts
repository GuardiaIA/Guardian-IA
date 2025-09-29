// data/mockReports.ts
// Note: This data structure is now slightly different from ReportData, it will be mapped in the app.
// We are only storing the userId here.
export const MOCK_REPORTS_DATA = [
  {
    id: 'rep1',
    riskLevel: 'Rojo',
    anomalyDescription: 'Cables expuestos cerca de un área húmeda. Riesgo eléctrico severo.',
    ppeRecommendation: 'Guantes dieléctricos, calzado de seguridad con aislamiento.',
    infrastructureSuggestion: 'Canalizar todo el cableado expuesto y asegurar las cajas de empalme.',
    legalReference: 'Ley 19.587, Anexo IV, Capítulo 14.',
    location: 'Sótano - Sala de bombas',
    date: '2024-07-28T14:30:00Z',
    imageUrl: 'https://placehold.co/600x400/ff0000/ffffff?text=Peligro+Eléctrico',
    userId: 4, // Carlos Perez
  },
  {
    id: 'rep2',
    riskLevel: 'Amarillo',
    anomalyDescription: 'Piso resbaladizo sin señalización adecuada. Material de limpieza almacenado incorrectamente.',
    ppeRecommendation: 'Calzado antideslizante.',
    infrastructureSuggestion: 'Colocar señalización de "piso mojado" y un gabinete para químicos.',
    legalReference: 'Ley 19.587, Anexo IV, Capítulo 5.',
    location: 'Pasillo Principal',
    date: '2024-07-25T09:00:00Z',
    imageUrl: 'https://placehold.co/600x400/ffff00/000000?text=Piso+Resbaladizo',
    userId: 3, // Laura Fernandez
  },
  {
    id: 'rep3',
    riskLevel: 'Verde',
    anomalyDescription: 'El área de trabajo está limpia y ordenada. Extintores de incendio accesibles y con carga vigente.',
    ppeRecommendation: 'No se requiere EPP adicional al estándar.',
    infrastructureSuggestion: 'Mantener el orden y la limpieza actuales.',
    legalReference: 'N/A',
    location: 'Oficina Administrativa',
    date: '2024-07-22T11:00:00Z',
    imageUrl: 'https://placehold.co/600x400/00ff00/ffffff?text=Área+Segura',
    userId: 2, // Roberto Sanchez
  }
];
