// data/users.ts
import { User, HierarchicalRole } from "../types";

export const MOCK_USERS: User[] = [
    {
        id: 1,
        name: 'Ana García',
        role: HierarchicalRole.Director,
        dni: '25.123.456',
        email: 'agarcia@guardian.ia',
        password: '123',
        avatarUrl: `https://i.pravatar.cc/150?u=director`,
    },
    {
        id: 2,
        name: 'Roberto Sanchez',
        role: HierarchicalRole.Intendente,
        dni: '28.789.012',
        email: 'rsanchez@guardian.ia',
        password: '123',
        avatarUrl: `https://i.pravatar.cc/150?u=intendente`,
    },
    {
        id: 3,
        name: 'Laura Fernandez',
        role: HierarchicalRole.Mayordomo,
        dni: '32.345.678',
        email: 'lfernandez@guardian.ia',
        password: '123',
        avatarUrl: `https://i.pravatar.cc/150?u=mayordomo`,
    },
    {
        id: 4,
        name: 'Carlos Perez',
        role: HierarchicalRole.PersonalDeServicio,
        dni: '35.901.234',
        email: 'cperez@guardian.ia',
        password: '123',
        avatarUrl: `https://i.pravatar.cc/150?u=personal`,
    },
    {
        id: 5,
        name: 'Decano Martin',
        role: HierarchicalRole.Autoridades,
        dni: '22.456.789',
        email: 'dmartin@guardian.ia',
        password: '123',
        avatarUrl: `https://i.pravatar.cc/150?u=autoridad`,
    }
];
