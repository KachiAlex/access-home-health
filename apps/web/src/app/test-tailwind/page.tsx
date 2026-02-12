'use client';

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Tailwind CSS Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">If you can see proper styling, Tailwind is working!</h2>
          <p className="text-gray-600 mb-4">This should have proper spacing, colors, and typography.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded">Blue Card</div>
            <div className="bg-green-500 text-white p-4 rounded">Green Card</div>
            <div className="bg-red-500 text-white p-4 rounded">Red Card</div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Test Button
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Gradient Background Test</h3>
          <p>This should have a nice purple to pink gradient background.</p>
        </div>
      </div>
    </div>
  );
}
