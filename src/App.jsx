import { useState } from 'react';
import './App.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const purokData = [
    { name: "PUROK CENTRAL", population: "216" },
    { name: "PUROK KAPIHAN", population: "177" },
    { name: "PUROK BALIMBING", population: "176" },
    { name: "PUROK KAHUMAYAN", population: "102" },
    { name: "PUROK TINUBDAN", population: "92" },
    { name: "PUROK LIGATING", population: "" }
  ];

  const totalPopulation = purokData.reduce((sum, purok) => {
    const value = parseInt(purok.population) || 0;
    return sum + value;
  }, 0);

  const stats = {
    population: totalPopulation,
    households: 344,
    families: 362,
    dangerZones: 2,
    safeZones: 3,
    greenZones: 2,
    puroks: purokData.length,
    professionals: 40,
    laborers: 127,
    businessEst: {
      store: 29,
      eatery: 4
    }
  };

  const hazardRiskFamilyData = [
    { purok: "PUROK CENTRAL", low: 0, med: 0, high: 2 },
    { purok: "PUROK KAPIHAN", low: 0, med: 0, high: 6 },
    { purok: "PUROK BALIMBING", low: 0, med: 0, high: 5 },
    { purok: "PUROK KAHUMAYAN", low: 0, med: 0, high: 12 },
    { purok: "PUROK TINUBDAN", low: 0, med: 0, high: 0 },
    { purok: "PUROK LIGATING", low: 0, med: 0, high: 0 }
  ];

const doughnutData = {
  labels: hazardRiskFamilyData.map(item => item.purok),
  datasets: [
    {
      label: 'High Risk Families (Typhoon/Flood)',
      data: hazardRiskFamilyData.map(item => item.high),
      backgroundColor: [
        '#B91C1C', // Deep Red - Purok Central
        '#DC2626', // Red - Purok Kapihan
        '#EF4444', // Rose Red - Purok Balimbing
        '#F87171', // Light Red - Purok Kahumayan
        '#FECACA', // Pale Red - Purok Tinubdan
        '#FEE2E2'  // Very Light Red - Purok Ligating
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
    }
  ]
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="w-full px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">GIS - Brgy Badiang</h1>
          <p className="mt-2 md:mt-0 text-sm md:text-base text-blue-100">Maasin City, Southern Leyte</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="w-full px-4">
          <ul className="flex flex-wrap gap-2 justify-center text-sm font-medium text-gray-700">
            {['home', 'data', 'map', 'about'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-t-lg transition-all ${
                    activeTab === tab ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-100'
                  }`}
                >
                  {tab === 'home' ? 'Home' : tab === 'data' ? 'GIS Data' : tab === 'map' ? 'Interactive Map' : 'About'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 py-8 space-y-12 max-w-none">
        {/* HOME SECTION */}
        {activeTab === 'home' && (
          <>
            <section className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to Brgy. Badiang GIS Portal</h2>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                Explore the geographical and demographic data of Brgy. Badiang, Maasin City, Southern Leyte.
              </p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Population', value: stats.population },
                { label: 'Households', value: stats.households },
                { label: 'Families', value: stats.families },
                { label: 'Danger Zones', value: stats.dangerZones },
                { label: 'Safe Zones', value: stats.safeZones },
                { label: 'Green Zones', value: stats.greenZones },
                { label: 'Puroks', value: stats.puroks },
                { label: 'Professionals', value: stats.professionals },
                { label: 'Laborers', value: stats.laborers },
                { label: 'Stores', value: stats.businessEst.store },
                { label: 'Eateries', value: stats.businessEst.eatery }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">{item.value}</p>
                </div>
              ))}
            </section>
          </>
        )}

        {/* GIS DATA SECTION */}
        {activeTab === 'data' && (
          <section className="bg-white rounded-xl shadow-lg p-6 space-y-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Demographic & Zonal Statistics</h2>

            {/* Population per Purok */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Population per Purok</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {purokData.map((purok, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
                    <h4 className="text-md font-semibold text-gray-800">{purok.name}</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      {purok.population || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Household and Family Stats */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Household & Family Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="text-lg font-semibold text-yellow-700">Households</h4>
                  <p className="text-3xl font-bold text-yellow-600">{stats.households}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h4 className="text-lg font-semibold text-orange-700">Families</h4>
                  <p className="text-3xl font-bold text-orange-600">{stats.families}</p>
                </div>
              </div>
            </div>

            {/* Workforce */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Workforce Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h4 className="text-lg font-semibold text-purple-700">Professionals</h4>
                  <p className="text-3xl font-bold text-purple-600">{stats.professionals}</p>
                </div>
                <div className="bg-pink-50 p-6 rounded-xl border-l-4 border-pink-500">
                  <h4 className="text-lg font-semibold text-pink-700">Laborers</h4>
                  <p className="text-3xl font-bold text-pink-600">{stats.laborers}</p>
                </div>
              </div>
            </div>

            {/* Business Establishments */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Business Establishments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <h4 className="text-lg font-semibold text-cyan-700">Stores</h4>
                  <p className="text-3xl font-bold text-cyan-600">{stats.businessEst.store}</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
                  <h4 className="text-lg font-semibold text-indigo-700">Eateries</h4>
                  <p className="text-3xl font-bold text-indigo-600">{stats.businessEst.eatery}</p>
                </div>
              </div>
            </div>

          {/* Hazard Risk Chart - Doughnut */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">High Risk Families (Typhoon/Flood)</h3>
            <div className="max-w-md mx-auto">
              <Doughnut data={doughnutData} />
                <p className="text-sm text-gray-600 mt-4 text-center italic">
                  <strong>Note:</strong> Data for <em>Purok Tinubdan</em> and <em>Purok Ligating</em> is currently unavailable and therefore not represented in the hazard risk chart. Additionally, all reported <em>Low</em> and <em>Medium</em> risk values for Typhoon/Flood across all puroks are zero. As a result, the chart visualizes only the <em>High Risk</em> category to accurately reflect the available data.
                </p>
            </div>
          </div>

          </section>
        )}

        {/* MAP SECTION */}
        {activeTab === 'map' && (
          <section className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
            <h2 className="text-2xl font-bold text-gray-800 p-6 border-b">Interactive Map Viewer - Brgy. Badiang</h2>
            <div className="relative h-[400px] md:h-[600px]">
              <iframe
                title="Barangay Badiang Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15710.001802737152!2d124.79349099964867!3d10.139914048811626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3307464dff1dd8bf%3A0xf1b22384801d01f5!2sBadiang%2C%20Maasin%20City%2C%20Southern%20Leyte!5e0!3m2!1sen!2sph!4v1750484078179!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
        )}

        {/* ABOUT SECTION */}
        {activeTab === 'about' && (
          <section className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This GIS System</h2>
            <p className="text-gray-700 mb-4">
              This Geographical Information System (GIS) provides detailed insights into Brgy. Badiang’s data to assist with planning, decision-making, and development.
            </p>
            <p className="text-gray-700">
              Maintained by local data collectors and IT developers to serve the community effectively and transparently.
            </p>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="w-full px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Brgy. Badiang GIS System | All Rights Reserved</p>
          <p className="text-xs mt-2 opacity-80">Developed by Clarence Clide Cabero</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
