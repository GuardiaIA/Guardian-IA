import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginView from './components/LoginView';
import NavBar from './components/NavBar';
import ScanView from './components/ScanView';
import HistoryView from './components/HistoryView';
import ReportView from './components/ReportView';
import ChemicalGuideView from './components/ChemicalGuideView';
import UserManagementView from './components/UserManagementView';
import UserGuideView from './components/UserGuideView';
import { ReportData, User, RiskLevel, HierarchicalRole, View } from './types';
import { MOCK_USERS } from './data/users';
import { MOCK_REPORTS_DATA } from './data/mockReports';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reports, setReports] = useState<ReportData[]>([]);
  const [activeView, setActiveView] = useState<View>('scan');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  // Initialize reports with user data
  useEffect(() => {
    const initialReports: ReportData[] = MOCK_REPORTS_DATA.map(report => {
      const user = users.find(u => u.id === report.userId);
      if (!user) {
        console.error(`User with id ${report.userId} not found for report ${report.id}`);
        return {
          ...report,
          riskLevel: report.riskLevel as RiskLevel,
          user: { id: 0, name: 'Unknown User', role: HierarchicalRole.PersonalDeServicio, dni: 'N/A', email: 'N/A' } // fallback user
        };
      }
      return {
        ...report,
        riskLevel: report.riskLevel as RiskLevel,
        user: user,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setReports(initialReports);
  }, [users]);

  const handleLogin = (email: string, password: string):User | null => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      if(user.role === HierarchicalRole.Director || user.role === HierarchicalRole.Autoridades) {
          setActiveView('history');
      } else {
          setActiveView('scan');
      }
      return user;
    }
    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleReportGenerated = (newReport: ReportData) => {
    const reportWithId: ReportData = {
      ...newReport,
      id: `rep-${Date.now()}`,
    };
    setReports(prevReports => [reportWithId, ...prevReports]);
    setSelectedReport(reportWithId);
  };

  const handleSelectReport = (report: ReportData) => {
    setSelectedReport(report);
  };

  const handleBackToHistory = () => {
    setSelectedReport(null);
    setActiveView('history');
  };

  const handleAddUser = (newUser: Omit<User, 'id' | 'avatarUrl'>): { success: boolean, message: string } => {
      if (users.some(u => u.email === newUser.email)) {
          return { success: false, message: 'El correo electrónico ya está registrado.' };
      }
      const userWithId: User = {
          ...newUser,
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          avatarUrl: `https://i.pravatar.cc/150?u=${newUser.email}`
      }
      setUsers(prevUsers => [...prevUsers, userWithId]);
      return { success: true, message: 'Usuario creado exitosamente.' };
  }

  const handleDeleteUser = (userId: number) => {
      if (currentUser?.id === userId) {
          alert("No puede eliminar su propia cuenta.");
          return;
      }
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} onAddNewUser={handleAddUser} />;
  }

  const renderContent = () => {
    if (selectedReport) {
      return <ReportView report={selectedReport} onBack={handleBackToHistory} />;
    }
    switch (activeView) {
      case 'scan':
        return <ScanView currentUser={currentUser} onReportGenerated={handleReportGenerated} />;
      case 'history':
        return <HistoryView currentUser={currentUser} reports={reports} onSelectReport={handleSelectReport} />;
      case 'chemicals':
        return <ChemicalGuideView />;
      case 'users':
        return <UserManagementView currentUser={currentUser} users={users} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />;
      case 'guide':
        return <UserGuideView />;
      default:
        return <ScanView currentUser={currentUser} onReportGenerated={handleReportGenerated} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <NavBar activeView={activeView} setActiveView={(view) => { setSelectedReport(null); setActiveView(view); }} userRole={currentUser.role} />
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;