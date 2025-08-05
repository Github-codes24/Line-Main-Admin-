import { useState, useEffect } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const TabOfList = () => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      tabName: 'Plumbing',
      subTabs: 'Plumber, Tank Cleaner',
      acid: [true, true, true]
    },
    {
      id: 2,
      tabName: 'Electrician',
      subTabs: 'NA',
      acid: [true, true, true]
    },
    {
      id: 3,
      tabName: 'Tiles Fitting',
      subTabs: 'NA',
      acid: [true, true, true]
    },
    {
      id: 4,
      tabName: 'Painting',
      subTabs: 'Painter, POP Person',
      acid: [true, true, true]
    },
    {
      id: 5,
      tabName: 'AC & Refrigerator Repairing',
      subTabs: 'NA',
      acid: [true, true, true]
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTab, setNewTab] = useState({
    tabName: '',
    subTabs: '',
    acid: [false, false, false]
  });

  const filteredTabs = tabs.filter(tab => 
    tab.tabName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tab.subTabs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTab = () => {
    if (newTab.tabName.trim() === '') return;
    
    const updatedTabs = [
      ...tabs,
      {
        id: tabs.length + 1,
        ...newTab
      }
    ];
    
    setTabs(updatedTabs);
    setNewTab({
      tabName: '',
      subTabs: '',
      acid: [false, false, false]
    });
    setShowAddForm(false);
  };

  const toggleAcid = (tabId, index) => {
    const updatedTabs = tabs.map(tab => {
      if (tab.id === tabId) {
        const newAcid = [...tab.acid];
        newAcid[index] = !newAcid[index];
        return { ...tab, acid: newAcid };
      }
      return tab;
    });
    setTabs(updatedTabs);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tab List</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by Tab Name, Sub Tab Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" />
          Add New Tab
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <h2 className="text-lg font-medium mb-3">Add New Tab</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tabName" className="block text-sm font-medium text-gray-700">Tab Name</label>
              <input
                type="text"
                id="tabName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newTab.tabName}
                onChange={(e) => setNewTab({...newTab, tabName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="subTabs" className="block text-sm font-medium text-gray-700">Sub Tabs</label>
              <input
                type="text"
                id="subTabs"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={newTab.subTabs}
                onChange={(e) => setNewTab({...newTab, subTabs: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Acid</label>
            <div className="flex space-x-4 mt-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAcid = [...newTab.acid];
                    newAcid[index] = !newAcid[index];
                    setNewTab({...newTab, acid: newAcid});
                  }}
                  className={`w-8 h-8 rounded flex items-center justify-center ${newTab.acid[index] ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                >
                  {newTab.acid[index] ? <FaCheck /> : '+'}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTab}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr.No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tab Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Tabs
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acid
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTabs.map((tab, index) => (
              <tr key={tab.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{tab.tabName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tab.subTabs}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {tab.acid.map((active, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleAcid(tab.id, idx)}
                        className={`w-6 h-6 rounded flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {active ? <FaCheck size={12} /> : null}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 1 to {filteredTabs.length} of {tabs.length} Entries
        </div>
      </div>
    </div>
  );
};

export default TabOfList;