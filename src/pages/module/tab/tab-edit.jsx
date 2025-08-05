import { FiArrowLeft } from 'react-icons/fi';

const EditTab = ({ tabData, onBack }) => {
  // Default data if not provided
  const data = tabData || {
    tabName: "Plumbing",
    subTabs: ["Plumber", "Tank Cleaner"]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center">
          <button 
            onClick={onBack}
            className="text-white mr-4 hover:text-blue-200 transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-white">View Tab</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tab Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tab Name:
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-gray-800">{data.tabName}</p>
            </div>
          </div>

          {/* Sub Tab Names */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Tab Name:
            </label>
            <div className="space-y-2">
              {data.subTabs.map((subTab, index) => (
                <div 
                  key={index} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md"
                >
                  <p className="text-gray-800">{subTab}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTab;