import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Calendar, HelpCircle, Plus } from 'lucide-react';

// Sample team data
const initialTeamData = [
  { id: 1, name: 'Andy Bernard', department: 'Management', avatar: 'A', status: 'Working', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 2, name: 'Charles Malkins', department: 'Accounting', avatar: 'C', status: 'Absent', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 3, name: 'Creed Bratton', department: 'Accounting', avatar: 'C', status: 'Slacking', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 4, name: 'Darryl Philbin', department: 'Management', avatar: 'D', status: 'Working', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 5, name: 'Deleted User (227564)', department: 'Product Oversight', avatar: 'D', status: 'Absent', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 6, name: 'Dwight Schrute', department: 'Management', avatar: 'D', status: 'Working', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 7, name: 'Gabe Lewis', department: 'Management', avatar: 'G', status: 'Slacking', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 8, name: 'Horatio James', department: 'Accounting', avatar: 'H', status: 'Absent', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 9, name: 'Jo Bennett', department: 'Product Oversight', avatar: 'J', status: 'Working', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
  { id: 10, name: 'Kelly Erin Hannon', department: 'Management', avatar: 'K', status: 'Working', productiveTime: '-', offlineTime: '-', deskTime: '-', arrivedAt: '-', leftAt: '-', atWork: '-', activeApp: '-', activeProject: '-' },
];

const Avatar = ({ letter, className = "" }) => (
  <div className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 ${className}`}>
    {letter}
  </div>
);

const StatusTab = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${isActive ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600'}`}
  >
    {label}
    <span className="ml-2 text-gray-400">{count}</span>
  </button>
);

const TeamMembersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('Employees');
  const [teamMembers, setTeamMembers] = useState(initialTeamData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('name');
  const [newMember, setNewMember] = useState({
    name: '',
    department: '',
    avatar: '',
    status: 'Working', 
  });
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMembers = filteredMembers.sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.status.localeCompare(b.status);
  });

  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.department && newMember.avatar) {
      const newMemberWithId = {
        ...newMember,
        id: teamMembers.length + 1,
        productiveTime: '-',
        offlineTime: '-',
        deskTime: '-',
        arrivedAt: '-',
        leftAt: '-',
        atWork: '-',
        activeApp: '-',
        activeProject: '-',
      };
      setTeamMembers((prev) => [...prev, newMemberWithId]);
      setIsAddMemberModalOpen(false); 
      setNewMember({ name: '', department: '', avatar: '', status: 'Working' }); 
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Team Members</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>Sat, January 18, 2025</span>
          </div>
          <div className="flex gap-2">
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add team member
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search team member"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 border rounded-lg flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button onClick={() => setSortOrder(sortOrder === 'name' ? 'status' : 'name')} className="px-4 py-2 border rounded-lg flex items-center gap-2">
            Sort by {sortOrder === 'name' ? 'Status' : 'Name'}
          </button>
        </div>

        <div className="flex border-b">
          <StatusTab
            label="Employees"
            count={teamMembers.length}
            isActive={activeStatus === 'Employees'}
            onClick={() => setActiveStatus('Employees')}
          />
          <StatusTab
            label="Working"
            count={teamMembers.filter(m => m.status === 'Working').length}
            isActive={activeStatus === 'Working'}
            onClick={() => setActiveStatus('Working')}
          />
          <StatusTab
            label="Slacking"
            count={teamMembers.filter(m => m.status === 'Slacking').length}
            isActive={activeStatus === 'Slacking'}
            onClick={() => setActiveStatus('Slacking')}
          />
          <StatusTab
            label="Absent"
            count={teamMembers.filter(m => m.status === 'Absent').length}
            isActive={activeStatus === 'Absent'}
            onClick={() => setActiveStatus('Absent')}
          />
          <StatusTab
            label="Late"
            count={teamMembers.filter(m => m.status === 'Late').length}
            isActive={activeStatus === 'Late'}
            onClick={() => setActiveStatus('Late')}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2 font-normal">Name</th>
              <th className="pb-2 font-normal">Status</th>
              <th className="pb-2 font-normal">Productive time</th>
              <th className="pb-2 font-normal">Offline time</th>
              <th className="pb-2 font-normal">DeskTime</th>
              <th className="pb-2 font-normal">Arrived at</th>
              <th className="pb-2 font-normal">Left at</th>
              <th className="pb-2 font-normal">At work</th>
              <th className="pb-2 font-normal">Active app</th>
              <th className="pb-2 font-normal">Active project</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member) => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar letter={member.avatar} />
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.department}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">{member.status}</td>
                <td className="py-4">{member.productiveTime}</td>
                <td className="py-4">{member.offlineTime}</td>
                <td className="py-4">{member.deskTime}</td>
                <td className="py-4">{member.arrivedAt}</td>
                <td className="py-4">{member.leftAt}</td>
                <td className="py-4">{member.atWork}</td>
                <td className="py-4">{member.activeApp}</td>
                <td className="py-4">{member.activeProject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddMemberModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleNewMemberChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={newMember.department}
                  onChange={handleNewMemberChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter department"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Avatar Letter</label>
                <input
                  type="text"
                  name="avatar"
                  value={newMember.avatar}
                  onChange={handleNewMemberChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter avatar letter"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newMember.status}
                  onChange={handleNewMemberChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Working">Working</option>
                  <option value="Slacking">Slacking</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="px-4 py-2 text-white bg-green-500 rounded-lg"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembersDashboard;
