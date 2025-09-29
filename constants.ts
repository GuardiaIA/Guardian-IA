
import { ChemicalGroup } from './types';

export const CHEMICAL_GUIDE_DATA: ChemicalGroup[] = [
  {
    title: '1. Sustancias Extremadamente Corrosivas (Ácidos y Bases Fuertes)',
    chemicals: [
      {
        name: 'Ácido Clorhídrico',
        description: 'Ácido fuerte, corrosivo. Los vapores son muy irritantes para ojos y vías respiratorias.',
        epp: 'Gafas/Máscara facial completa anti-salpicaduras. Guantes de goma (nitrilo o neopreno). Delantal/Traje resistente a químicos.',
        firstAid: 'Contacto ocular/piel: Enjuagar inmediatamente con abundante agua por al menos 15-20 minutos. Inhalación: Trasladar a la víctima al aire fresco. Ingestión: NO inducir el vómito. Dar agua o leche (si está consciente). Buscar atención médica urgente.'
      },
      {
        name: 'Hidróxido de Sodio (Soda Cáustica)',
        description: 'Base fuerte, corrosiva. En forma sólida o disuelta, destruye tejidos por contacto.',
        epp: 'Gafas/Máscara. Guantes de goma resistentes a álcalis. Traje de protección si se manipula la forma sólida o concentrada.',
        firstAid: 'Mismo PA que Ácido Clorhídrico. La diferencia es que la neutralización inicial no es viable en PA. Enjuague prolongado y traslado inmediato al centro de salud.'
      }
    ]
  },
  {
    title: '2. Solventes y Líquidos Orgánicos (Inflamables/Tóxicos)',
    chemicals: [
      {
        name: 'Tolueno, Hexano, Benceno, Xilenos',
        description: 'Líquidos volátiles, altamente inflamables. Tóxicos por inhalación o ingestión. Afectan el Sistema Nervioso Central (SNC). El Benceno es un carcinógeno conocido.',
        epp: 'Gafas de seguridad. Guantes de nitrilo (verificar resistencia a solventes). Ventilación forzada o Respirador con filtro para vapores orgánicos.',
        firstAid: 'Inhalación: Trasladar a la víctima al aire fresco, mantenerla caliente y en reposo. Ingestión: NO inducir el vómito. Contacto: Lavar con abundante agua y jabón. Buscar atención médica inmediatamente.'
      },
      {
        name: 'Éter Etílico, Acetona, MEK',
        description: 'Líquidos extremadamente inflamables y volátiles. Irritantes oculares y de las vías respiratorias.',
        epp: 'Gafas de seguridad. Guantes de nitrilo. Ventilación y evitar fuentes de ignición.',
        firstAid: 'Incendio: Usar extintores de polvo químico seco o CO2. Contacto/Inhalación/Ingestión: Mismo PA que Tolueno.'
      }
    ]
  },
  {
    title: '3. Otros Compuestos Controlados',
    chemicals: [
        {
            name: 'Permanganato de Potasio',
            description: 'Agente oxidante fuerte. En forma sólida es irritante. En contacto con materiales orgánicos puede iniciar un incendio.',
            epp: 'Gafas de seguridad. Guantes de nitrilo/látex. Evitar contacto con combustibles.',
            firstAid: 'Contacto ocular/piel: Lavar con abundante agua. Ingestión: Dar grandes cantidades de agua y buscar atención médica.'
        }
    ]
  }
];
