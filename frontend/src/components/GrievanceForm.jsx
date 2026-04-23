import { useState, useEffect } from 'react';
import api from '../utils/api';

const GrievanceForm = ({ setGrievances, currentGrievance, clearCurrent }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Academics' });

  useEffect(() => {
    if (currentGrievance) {
      setFormData(currentGrievance);
    } else {
      setFormData({ title: '', description: '', category: 'Academics' });
    }
  }, [currentGrievance]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentGrievance) {
        const res = await api.put(`/grievances/${currentGrievance._id}`, formData);
        setGrievances(prev => prev.map(g => (g._id === res.data._id ? res.data : g)));
        clearCurrent();
      } else {
        const res = await api.post('/grievances', formData);
        setGrievances(prev => [res.data, ...prev]);
        setFormData({ title: '', description: '', category: 'Academics' });
      }
    } catch (err) {
      console.error(err);
      alert('Error saving grievance');
    }
  };

  return (
    <div className="form-card">
      <h3>{currentGrievance ? 'Edit Grievance' : 'Submit New Grievance'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Academics">Academics</option>
            <option value="Hostel">Hostel</option>
            <option value="Facilities">Facilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">{currentGrievance ? 'Update' : 'Submit'}</button>
          {currentGrievance && <button type="button" className="btn-secondary" onClick={clearCurrent}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;
