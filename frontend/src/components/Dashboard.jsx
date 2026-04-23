import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import GrievanceForm from './GrievanceForm';
import { Search, LogOut, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGrievance, setCurrentGrievance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await api.get('/grievances');
      setGrievances(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchQuery.trim() === '') {
        fetchGrievances();
      } else {
        const res = await api.get(`/grievances/search?title=${searchQuery}`);
        setGrievances(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        await api.delete(`/grievances/${id}`);
        setGrievances(grievances.filter(g => g._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (grievance) => {
    setCurrentGrievance(grievance);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Grievance System</h1>
        <button className="btn-secondary logout" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </header>
      
      <main className="dashboard-main">
        <aside className="dashboard-sidebar">
          <GrievanceForm 
            setGrievances={setGrievances} 
            currentGrievance={currentGrievance} 
            clearCurrent={() => setCurrentGrievance(null)} 
          />
        </aside>

        <section className="dashboard-content">
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Search grievances by title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary search-btn">
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="grievance-list">
            {grievances.length === 0 ? (
              <p className="no-data">No grievances found.</p>
            ) : (
              grievances.map(g => (
                <div key={g._id} className="grievance-card">
                  <div className="grievance-header">
                    <h4>{g.title}</h4>
                    <span className={`status badge-${g.status.replace(' ', '-').toLowerCase()}`}>
                      {g.status}
                    </span>
                  </div>
                  <p className="description">{g.description}</p>
                  <div className="grievance-footer">
                    <div className="meta">
                      <span className="category">{g.category}</span>
                      <span className="date">{new Date(g.date).toLocaleDateString()}</span>
                      <span className="author">By: {g.user?.name || 'Unknown'}</span>
                    </div>
                    <div className="actions">
                      <button className="btn-icon text-blue" onClick={() => handleEdit(g)}>
                        <Edit size={16} />
                      </button>
                      <button className="btn-icon text-red" onClick={() => handleDelete(g._id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
