import React, { useState } from "react";
import { FiX } from "react-icons/fi"; // or 'react-icons/fa', whichever icon you intended

/**
 * 🎯 TabView modal dialog:
 * - Accepts `tabList`, `tabData`, `onClose` via props
 * - Uses `useState` inside the component body only
 */
function TabView({ tabList = [], tabData = {}, onClose }) {
  // ✅ Hook must go here, at top level of function component
  const [tabState, setTabState] = useState(tabList);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">View Tab</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tab Name:
            </label>
            <div className="w-full px-4 py-2 bg-gray-50 rounded-md border border-gray-200">
              {tabData?.tabName ?? "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Tab Name:
            </label>
            <div className="space-y-2">
              {tabData?.subTabs?.length ? (
                tabData.subTabs.map((subTab, i) => (
                  <div
                    key={i}
                    className="w-full px-4 py-2 bg-gray-50 rounded-md border border-gray-200"
                  >
                    {subTab}
                  </div>
                ))
              ) : (
                <div className="w-full px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-500">
                  No sub tabs
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabView;
