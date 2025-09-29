import React, { useState } from 'react';
import { User, HierarchicalRole } from '../types';

interface UserManagementViewProps {
  currentUser: User;
  users: User[];
  onAddUser: (user: Omit<User, 'id' | 'avatarUrl'>) => { success: boolean, message: string };
  onDeleteUser: (userId: number) => void;
}

const UserManagementView: React.FC<UserManagementViewProps> = ({ currentUser, users, onAddUser, onDeleteUser }) => {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<HierarchicalRole>(HierarchicalRole.PersonalDeServicio);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !dni || !email || !password || !role) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        setError('');
        setSuccess('');
        const result = onAddUser({ name, dni, email, password, role });
        
        if (result.success) {
            setSuccess(result.message);
            // Reset form
            setName('');
            setDni('');
            setEmail('');
            setPassword('');
            setRole(HierarchicalRole.PersonalDeServicio);
        } else {
            setError(result.message);
        }
    }
    
    const confirmDelete = (user: User) => {
        setUserToDelete(user);
    }

    const executeDelete = () => {
        if (userToDelete) {
            onDeleteUser(userToDelete.id);
            setUserToDelete(null);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                {/* Add User Form */}
                <div className="xl:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Agregar Nuevo Usuario</h2>
                    <p className="text-slate-500 mb-6">Cree una cuenta para un nuevo miembro del personal.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form fields */}
                        <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <input type="text" placeholder="DNI" value={dni} onChange={e => setDni(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        <select value={role} onChange={e => setRole(e.target.value as HierarchicalRole)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            {Object.values(HierarchicalRole).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}
                        <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                            Crear Usuario
                        </button>
                    </form>
                </div>
                {/* User List */}
                <div className="xl:col-span-3 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Usuarios Existentes</h2>
                    <p className="text-slate-500 mb-6">Lista de usuarios registrados en el sistema.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                           <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usuario</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">DNI</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rol</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                                    <div className="text-sm text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{user.dni}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{user.role}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => confirmDelete(user)} 
                                                disabled={currentUser.id === user.id}
                                                className="text-red-600 hover:text-red-900 disabled:text-slate-300 disabled:cursor-not-allowed">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Deletion Confirmation Modal */}
            {userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-bold text-slate-900">Confirmar Eliminación</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            ¿Está seguro de que desea eliminar al usuario <strong>{userToDelete.name}</strong>? Esta acción no se puede deshacer.
                        </p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={() => setUserToDelete(null)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">
                                Cancelar
                            </button>
                            <button onClick={executeDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserManagementView;