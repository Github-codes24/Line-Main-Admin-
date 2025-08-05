import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

const AddTab = ({ onClose, onAddTab }) => {
  const [tabName, setTabName] = useState('');
  const [subTabs, setSubTabs] = useState(['']);
  const [isOpen, setIsOpen] = useState(true);

  const handleAddSubTab = () => {
    setSubTabs([...subTabs, '']);
  };

  const handleSubTabChange = (index, value) => {
    const newSubTabs = [...subTabs];
    newSubTabs[index] = value;
    setSubTabs(newSubTabs);
  };

  const handleRemoveSubTab = (index) => {
    if (subTabs.length > 1) {
      const newSubTabs = subTabs.filter((_, i) => i !== index);
      setSubTabs(newSubTabs);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredSubTabs = subTabs.filter(subTab => subTab.trim() !== '');
    onAddTab({
      tabName,
      subTabs: filteredSubTabs.length > 0 ? filteredSubTabs.join(', ') : 'NA'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Add New Tab</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tab Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Tab Name"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Tab Name:
            </label>
            {subTabs.map((subTab, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Sub Tab Name"
                  value={subTab}
                  onChange={(e) => handleSubTabChange(index, e.target.value)}
                />
                {subTabs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSubTab(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubTab}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              <FiPlus className="mr-1" />
              Add More Sub Tab
            </button>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Add Tab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddTab;

// Example usage in a parent component:
/*
const ParentComponent = () => {
  const [showAddTab, setShowAddTab] = useState(false);
  const [tabs, setTabs] = useState([]);

  const handleAddTab = (newTab) => {
    setTabs([...tabs, { ...newTab, id: Date.now() }]);
  };

  return (
    <div>
      <button onClick={() => setShowAddTab(true)}>Open Add Tab</button>
      {showAddTab && (
        <AddNewTab 
          onClose={() => setShowAddTab(false)} 
          onAddTab={handleAddTab} 
        />
      )}
    </div>
  );
};
*/

