import React, { useState } from 'react';
import { Users, Plane, Calculator, Settings, Plus, FileText, LogOut, Eye, EyeOff, Fuel, TrendingUp, Package, Calendar } from 'lucide-react';

const FuelManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // États pour les données (simulation - remplacé par API backend)
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', department: 'Administration', name: 'Administrateur Système' },
    { id: 2, username: 'dir_ops', password: 'ops123', role: 'department_head', department: 'Opérations Aériennes', name: 'Directeur Opérations' },
    { id: 3, username: 'dir_dispatch', password: 'dispatch123', role: 'department_head', department: 'Dispatch', name: 'Directeur Dispatch' },
    { id: 4, username: 'dir_finance', password: 'finance123', role: 'department_head', department: 'Finance', name: 'Directeur Finance' },
    { id: 5, username: 'pilot1', password: 'pilot123', role: 'pilot', department: 'Opérations Aériennes', name: 'Capitaine MUKENDI' },
    { id: 6, username: 'pilot2', password: 'pilot123', role: 'pilot', department: 'Opérations Aériennes', name: 'Capitaine KABONGO' }
  ]);
  
  const [pilots, setPilots] = useState([
    { id: 1, name: 'Capitaine MUKENDI', license: 'MG001', status: 'Actif', userId: 5 },
    { id: 2, name: 'Capitaine KABONGO', license: 'MG002', status: 'Actif', userId: 6 }
  ]);
  
  const [flightPlans, setFlightPlans] = useState([
    { id: 1, flightNumber: 'MG101', route: 'KIN-LBV', fuelRequired: 2500, date: '2025-08-06', status: 'Planifié', pilotId: 1, pilotName: 'Capitaine MUKENDI' },
    { id: 2, flightNumber: 'MG102', route: 'LBV-KIN', fuelRequired: 2300, date: '2025-08-06', status: 'Planifié', pilotId: 2, pilotName: 'Capitaine KABONGO' }
  ]);
  
  const [captainReports, setCaptainReports] = useState([
    { id: 1, flightNumber: 'MG100', pilot: 'Capitaine MUKENDI', fuelUsed: 2200, fuelRemaining: 300, date: '2025-08-05', status: 'Validé', pilotId: 1 }
  ]);

  const [fuelStock, setFuelStock] = useState([
    { id: 1, type: 'Entrée', quantity: 50000, date: '2025-08-01', description: 'Stock initial', reference: 'INIT-001' },
    { id: 2, type: 'Sortie', quantity: -2200, date: '2025-08-05', description: 'Vol MG100', reference: 'MG100' }
  ]);

  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const FUEL_PRICE = 850;

  const getCurrentStock = () => {
    return fuelStock.reduce((total, movement) => total + movement.quantity, 0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginData.username && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      setActiveTab('dashboard');
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginData({ username: '', password: '' });
    setActiveTab('dashboard');
  };

  const addDirector = (directorData) => {
    const newUser = {
      id: users.length + 1,
      role: 'department_head',
      ...directorData
    };
    setUsers([...users, newUser]);
  };

  const addDepartmentUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      department: currentUser.department,
      ...userData
    };
    setUsers([...users, newUser]);
  };

  const addPilot = (pilotData) => {
    const newUser = {
      id: users.length + 1,
      username: pilotData.username,
      password: pilotData.password,
      role: 'pilot',
      department: 'Opérations Aériennes',
      name: pilotData.name
    };
    
    const newPilot = {
      id: pilots.length + 1,
      name: pilotData.name,
      license: pilotData.license,
      status: 'Actif',
      userId: newUser.id
    };
    
    setUsers([...users, newUser]);
    setPilots([...pilots, newPilot]);
  };

  const addFlightPlan = (planData) => {
    const newPlan = {
      id: flightPlans.length + 1,
      ...planData,
      fuelRequired: parseInt(planData.fuelRequired),
      status: 'Planifié'
    };
    setFlightPlans([...flightPlans, newPlan]);
  };

  const addFuelEntry = (entryData) => {
    const newEntry = {
      id: fuelStock.length + 1,
      type: 'Entrée',
      quantity: parseInt(entryData.quantity),
      date: entryData.date,
      description: entryData.description,
      reference: entryData.reference
    };
    setFuelStock([...fuelStock, newEntry]);
  };

  const addCaptainReport = (reportData) => {
    const newReport = {
      id: captainReports.length + 1,
      ...reportData,
      fuelUsed: parseInt(reportData.fuelUsed),
      fuelRemaining: parseInt(reportData.fuelRemaining),
      status: 'Soumis',
      date: new Date().toISOString().split('T')[0]
    };

    const fuelConsumption = {
      id: fuelStock.length + 1,
      type: 'Sortie',
      quantity: -parseInt(reportData.fuelUsed),
      date: newReport.date,
      description: `Vol ${reportData.flightNumber}`,
      reference: reportData.flightNumber
    };
    
    setFuelStock([...fuelStock, fuelConsumption]);
    setCaptainReports([...captainReports, newReport]);
  };

  // Interface de connexion
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 text-white p-3 rounded-full inline-block mb-4">
              <Plane size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Mont-Gabaon Airlines</h1>
            <p className="text-gray-600">Système de Gestion Carburant</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-xs text-gray-500">
            <p className="mb-2">Comptes de test :</p>
            <div className="space-y-1">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Opérations:</strong> dir_ops / ops123</p>
              <p><strong>Dispatch:</strong> dir_dispatch / dispatch123</p>
              <p><strong>Finance:</strong> dir_finance / finance123</p>
              <p><strong>Pilote:</strong> pilot1 / pilot123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Navigation selon le rôle
  const getNavItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: <Settings size={20} /> }
    ];

    if (currentUser.role === 'admin') {
      return [
        ...commonItems,
        { id: 'create_directors', label: 'Créer Directeurs', icon: <Users size={20} /> },
        { id: 'global_overview', label: 'Vue Globale', icon: <TrendingUp size={20} /> }
      ];
    }

    if (currentUser.department === 'Opérations Aériennes' && currentUser.role === 'department_head') {
      return [
        ...commonItems,
        { id: 'create_pilots', label: 'Créer Pilotes', icon: <Users size={20} /> },
        { id: 'manage_pilots', label: 'Gérer Pilotes', icon: <Users size={20} /> },
        { id: 'captain_reports', label: 'Rapports Capitaine', icon: <FileText size={20} /> },
        { id: 'create_users', label: 'Équipe Opérations', icon: <Plus size={20} /> }
      ];
    }

    if (currentUser.role === 'pilot') {
      return [
        ...commonItems,
        { id: 'my_flights', label: 'Mes Vols', icon: <Plane size={20} /> },
        { id: 'fuel_status', label: 'Stock Carburant', icon: <Fuel size={20} /> }
      ];
    }

    if (currentUser.department === 'Dispatch' && currentUser.role === 'department_head') {
      return [
        ...commonItems,
        { id: 'manage_stock', label: 'Gestion Stock', icon: <Package size={20} /> },
        { id: 'flight_plans', label: 'Plans de Vol', icon: <Plane size={20} /> },
        { id: 'daily_reports', label: 'Rapports Journaliers', icon: <Calendar size={20} /> },
        { id: 'create_users', label: 'Équipe Dispatch', icon: <Plus size={20} /> }
      ];
    }

    if (currentUser.department === 'Finance' && currentUser.role === 'department_head') {
      return [
        ...commonItems,
        { id: 'financial_reports', label: 'Rapports Financiers', icon: <Calculator size={20} /> },
        { id: 'create_users', label: 'Équipe Finance', icon: <Plus size={20} /> }
      ];
    }

    return commonItems;
  };

  // Composants principaux
  const Dashboard = () => {
    const currentStock = getCurrentStock();
    const todayReports = captainReports.filter(r => r.date === new Date().toISOString().split('T')[0]);
    const todayPlans = flightPlans.filter(p => p.date === new Date().toISOString().split('T')[0]);
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord - {currentUser.department}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Stock Actuel</h3>
            <p className="text-3xl font-bold text-blue-600">{currentStock.toLocaleString()}L</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">Vols Aujourd'hui</h3>
            <p className="text-3xl font-bold text-green-600">{todayPlans.length}</p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800">Rapports Soumis</h3>
            <p className="text-3xl font-bold text-yellow-600">{todayReports.length}</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">Pilotes Actifs</h3>
            <p className="text-3xl font-bold text-purple-600">{pilots.filter(p => p.status === 'Actif').length}</p>
          </div>
        </div>
      </div>
    );
  };

  const CreateDirectors = () => {
    const [showAddDirector, setShowAddDirector] = useState(false);
    const [newDirector, setNewDirector] = useState({
      username: '', password: '', name: '', department: ''
    });

    const handleAddDirector = (e) => {
      e.preventDefault();
      addDirector(newDirector);
      setNewDirector({ username: '', password: '', name: '', department: '' });
      setShowAddDirector(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Gestion des Directeurs</h2>
          <button
            onClick={() => setShowAddDirector(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Créer Directeur</span>
          </button>
        </div>

        {showAddDirector && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Nouveau Directeur</h3>
            <form onSubmit={handleAddDirector} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="px-3 py-2 border rounded-md"
                value={newDirector.username}
                onChange={(e) => setNewDirector({...newDirector, username: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="px-3 py-2 border rounded-md"
                value={newDirector.password}
                onChange={(e) => setNewDirector({...newDirector, password: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Nom complet"
                className="px-3 py-2 border rounded-md"
                value={newDirector.name}
                onChange={(e) => setNewDirector({...newDirector, name: e.target.value})}
                required
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newDirector.department}
                onChange={(e) => setNewDirector({...newDirector, department: e.target.value})}
                required
              >
                <option value="">Sélectionner département</option>
                <option value="Opérations Aériennes">Opérations Aériennes</option>
                <option value="Dispatch">Dispatch</option>
                <option value="Finance">Finance</option>
              </select>
              <div className="flex space-x-2 md:col-span-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Créer
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddDirector(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  const CreateDepartmentUsers = () => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({
      username: '', password: '', name: '', role: 'user'
    });

    const handleAddUser = (e) => {
      e.preventDefault();
      addDepartmentUser(newUser);
      setNewUser({ username: '', password: '', name: '', role: 'user' });
      setShowAddUser(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Équipe {currentUser.department}</h2>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Ajouter Membre</span>
          </button>
        </div>

        {showAddUser && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">Nouveau Membre</h3>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="px-3 py-2 border rounded-md"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="px-3 py-2 border rounded-md"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Nom complet"
                className="px-3 py-2 border rounded-md"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="user">Utilisateur Standard</option>
                {currentUser.department === 'Opérations Aériennes' && (
                  <option value="pilot">Pilote</option>
                )}
              </select>
              <div className="flex space-x-2 md:col-span-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Créer
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddUser(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  // Interface simple avec composants de base
  const SimpleComponent = ({ title }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Interface en cours de développement...</p>
      </div>
    </div>
  );

  // Fonction pour rendre le contenu principal
  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'create_directors':
        return <CreateDirectors />;
      case 'create_users':
        return <CreateDepartmentUsers />;
      case 'global_overview':
        return <SimpleComponent title="Vue Globale" />;
      case 'create_pilots':
        return <SimpleComponent title="Créer Pilotes" />;
      case 'manage_pilots':
        return <SimpleComponent title="Gérer Pilotes" />;
      case 'manage_stock':
        return <SimpleComponent title="Gestion Stock" />;
      case 'flight_plans':
        return <SimpleComponent title="Plans de Vol" />;
      case 'captain_reports':
        return <SimpleComponent title="Rapports Capitaine" />;
      case 'daily_reports':
        return <SimpleComponent title="Rapports Journaliers" />;
      case 'financial_reports':
        return <SimpleComponent title="Rapports Financiers" />;
      case 'my_flights':
        return <SimpleComponent title="Mes Vols" />;
      case 'fuel_status':
        return <SimpleComponent title="Stock Carburant" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Plane size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Mont-Gabaon Airlines</h1>
              <p className="text-sm text-gray-600">Système de Gestion Carburant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <Fuel size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Stock: {getCurrentStock().toLocaleString()}L
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-600">{currentUser.department}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <ul className="space-y-2">
              {getNavItems().map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default FuelManagementSystem;