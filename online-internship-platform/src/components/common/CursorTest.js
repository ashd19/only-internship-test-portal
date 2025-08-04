import React from 'react';

const CursorTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🎯 Custom Cursor Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Cursor Visibility Test</h2>
          <p className="text-gray-600 mb-4">
            Move your mouse around this area. You should see a red-bordered cursor following your mouse.
            Check the browser console (F12) for position logs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded text-center">
              <p className="text-sm">Light Background</p>
            </div>
            <div className="bg-gray-800 p-4 rounded text-center">
              <p className="text-sm text-white">Dark Background</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded text-center">
              <p className="text-sm text-white">Gradient Background</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Elements Test</h2>
          <p className="text-gray-600 mb-4">
            Hover over these elements to see the cursor change to hover state (28x28px white glow).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
              Test Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center block">
              Test Link
            </button>
            <input type="text" placeholder="Test Input" className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <select className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Test Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Loading State Test</h2>
          <p className="text-gray-600 mb-4">
            Click this button to test the loading state (spinning gold logo).
          </p>
          
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
            onClick={() => {
              console.log('Loading test started');
              setTimeout(() => {
                console.log('Loading test completed');
              }, 3000);
            }}
          >
            Test Loading (3s)
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Debug Information</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Red border indicates cursor area is visible</li>
            <li>• Check browser console for position logs</li>
            <li>• Cursor should be 32x32px by default</li>
            <li>• Hover state should be 28x28px with white glow</li>
            <li>• Loading state should show spinning animation</li>
            <li>• Cursor should hide when mouse leaves viewport</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CursorTest; 