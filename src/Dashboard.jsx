import { useState } from 'react';
import TimeTracker from './TimeTracker.jsx';
import Summary from './Summary.jsx';
import { useAuth } from './useAuth.jsx';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  const handleNewEntry = (newEntry) => {
    setEntries((prevEntries) => [...prevEntries, { ...newEntry, employee: user.name }]);
  };

  return (
    <div className="dashboard">
      <TimeTracker onNewEntry={handleNewEntry} />
      <Summary entries={entries} />
    </div>
  );
}

export default Dashboard;