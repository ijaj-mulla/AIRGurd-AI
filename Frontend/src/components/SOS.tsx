import React, { useState } from 'react';
import { Plus, Trash2, Send, Check } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

const SOS: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Security Officer' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Facility Manager' },
  ]);
  
  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });
  const [alertSent, setAlertSent] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setMembers([
        ...members,
        {
          id: Date.now().toString(),
          name: newMember.name,
          email: newMember.email,
          role: newMember.role || 'Team Member',
        },
      ]);
      setNewMember({ name: '', email: '', role: '' });
    }
  };
  
  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };
  
  const handleSendAlert = () => {
    if (alertMessage.trim() === '') return;
    
    // Simulate sending alert
    setTimeout(() => {
      setAlertSent(true);
      setTimeout(() => {
        setAlertSent(false);
        setAlertMessage('');
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SOS Alert System</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Alert Message</h2>
              <div className="mb-4">
                <textarea
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows={5}
                  placeholder="Enter emergency alert message here..."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                ></textarea>
              </div>
              <button
                className={`w-full py-3 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  alertSent
                    ? 'bg-green-600'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={handleSendAlert}
                disabled={alertSent}
              >
                {alertSent ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Alert Sent
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Alert to All Members
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Full Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Email Address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Role (optional)"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  />
                </div>
                <button
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  onClick={handleAddMember}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Member
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Alert Recipients</h2>
            {members.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No members added yet. Add members to send alerts.
              </div>
            ) : (
              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-slate-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-slate-400">{member.email}</p>
                      <p className="text-xs text-cyan-400">{member.role}</p>
                    </div>
                    <button
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors duration-200"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOS;