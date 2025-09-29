// components/NavBar.tsx
import React from 'react';
// FIX: The 'View' type is exported from '../types', not '../App'.
import { HierarchicalRole, View } from '../types';


interface NavBarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    userRole: HierarchicalRole;
}

const NavItem: React.FC<{ label: string; view: View; activeView: View; setActiveView: (view: View) => void; icon: React.ReactElement }> = ({ label, view, activeView, setActiveView, icon }) => {
    const isActive = activeView === view;
    return (
        <button
            onClick={() => setActiveView(view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition ${
                isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            {/* FIX: Explicitly provide the props type to React.cloneElement to resolve a TypeScript overload error. */}
            {React.cloneElement<React.SVGProps<SVGSVGElement>>(icon, { className: 'h-5 w-5' })}
            {label}
        </button>
    );
};

const NavBar: React.FC<NavBarProps> = ({ activeView, setActiveView, userRole }) => {
    const navItems = [
        { label: 'Analizar Riesgo', view: 'scan' as View, icon: <ScanIcon />, roles: [HierarchicalRole.Director, HierarchicalRole.Intendente, HierarchicalRole.Mayordomo, HierarchicalRole.PersonalDeServicio] },
        { label: 'Historial', view: 'history' as View, icon: <HistoryIcon />, roles: Object.values(HierarchicalRole) },
        { label: 'Guía de Químicos', view: 'chemicals' as View, icon: <ChemicalIcon />, roles: Object.values(HierarchicalRole) },
        { label: 'Gestionar Usuarios', view: 'users' as View, icon: <UsersIcon />, roles: [HierarchicalRole.Director] },
        { label: 'Guía de Usuario', view: 'guide' as View, icon: <GuideIcon />, roles: Object.values(HierarchicalRole) },
    ];

    const availableNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <nav className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="space-y-2">
                {availableNavItems.map(item => (
                    <NavItem
                        key={item.view}
                        label={item.label}
                        view={item.view}
                        activeView={activeView}
                        setActiveView={setActiveView}
                        icon={item.icon}
                    />
                ))}
            </div>
        </nav>
    );
};

// SVG Icons for NavBar
const ScanIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6.5 6.5l-1-1M6 12H4m13.5-6.5l-1 1M12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);
const HistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ChemicalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2.143 2.143 0 00-1.822-.857h-1.072a2.143 2.143 0 00-2.143 2.143v2.143a2.143 2.143 0 002.143 2.143h1.072a2.143 2.143 0 001.822-.857l.857-1.5a2.143 2.143 0 000-2.286l-.857-1.5zM12 3.75l-4.286 7.5 4.286 7.5 4.286-7.5-4.286-7.5z" />
    </svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const GuideIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


export default NavBar;