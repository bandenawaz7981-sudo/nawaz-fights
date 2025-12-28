
import React, { useState } from 'react';
import { Flight } from '../types';

const MOCK_FLIGHTS: Flight[] = [
  { id: '1', airline: 'IndiGo', logo: 'https://picsum.photos/40/40?random=1', departure: 'DEL', arrival: 'BOM', departureTime: '06:00', arrivalTime: '08:15', duration: '2h 15m', price: 4500, type: 'Domestic', stops: 0 },
  { id: '2', airline: 'Air India Express', logo: 'https://picsum.photos/40/40?random=2', departure: 'DEL', arrival: 'BOM', departureTime: '09:30', arrivalTime: '11:50', duration: '2h 20m', price: 3800, type: 'Domestic', stops: 0 },
  { id: '3', airline: 'Vistara', logo: 'https://picsum.photos/40/40?random=3', departure: 'DEL', arrival: 'DXB', departureTime: '21:00', arrivalTime: '00:45', duration: '4h 15m', price: 18500, type: 'International', stops: 0 },
  { id: '4', airline: 'Emirates', logo: 'https://picsum.photos/40/40?random=4', departure: 'BOM', arrival: 'LHR', departureTime: '04:30', arrivalTime: '13:00', duration: '12h 30m', price: 65000, type: 'International', stops: 1 },
];

const FlightView: React.FC = () => {
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Mumbai');
  const [date, setDate] = useState('2024-12-25');
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Search Cheapest Flights</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">From</label>
            <input 
              type="text" 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">To</label>
            <input 
              type="text" 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Departure</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Available Deals</h2>
          <span className="text-sm text-slate-500">{MOCK_FLIGHTS.length} flights found</span>
        </div>
        
        {MOCK_FLIGHTS.map((flight) => (
          <div key={flight.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <img src={flight.logo} alt={flight.airline} className="w-12 h-12 rounded-lg" />
                <div>
                  <p className="font-bold text-slate-800">{flight.airline}</p>
                  <p className="text-xs text-slate-500">{flight.type}</p>
                </div>
              </div>
              
              <div className="flex flex-1 items-center justify-between w-full">
                <div className="text-center md:text-left">
                  <p className="text-lg font-bold text-slate-800">{flight.departureTime}</p>
                  <p className="text-sm text-slate-500">{flight.departure}</p>
                </div>
                
                <div className="flex flex-col items-center flex-1 px-8">
                  <p className="text-xs text-slate-400 mb-1">{flight.duration}</p>
                  <div className="w-full h-0.5 bg-slate-100 relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-slate-300 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-indigo-500 -translate-y-1/2"></div>
                    {flight.stops > 0 && (
                        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-slate-300 -translate-y-1/2 -translate-x-1/2"></div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}</p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-lg font-bold text-slate-800">{flight.arrivalTime}</p>
                  <p className="text-sm text-slate-500">{flight.arrival}</p>
                </div>
              </div>

              <div className="w-full md:w-1/4 flex items-center justify-between md:flex-col md:items-end gap-2 md:border-l md:pl-6 md:border-slate-100">
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600">₹{flight.price.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">per traveler</p>
                </div>
                <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors">
                  View Seats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightView;
