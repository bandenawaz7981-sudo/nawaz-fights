
import React, { useState } from 'react';
import { Hotel } from '../types';

const MOCK_HOTELS: Hotel[] = [
  { id: '1', name: 'Grand Royal Plaza', location: 'Dubai, UAE', image: 'https://picsum.photos/600/400?random=10', pricePerNight: 12500, rating: 4.8, reviews: 1240 },
  { id: '2', name: 'Azure Beach Resort', location: 'Goa, India', image: 'https://picsum.photos/600/400?random=11', pricePerNight: 8200, rating: 4.5, reviews: 850 },
  { id: '3', name: 'The Urban Retreat', location: 'London, UK', image: 'https://picsum.photos/600/400?random=12', pricePerNight: 22000, rating: 4.7, reviews: 560 },
  { id: '4', name: 'Budget Stay Inn', location: 'Bangkok, Thailand', image: 'https://picsum.photos/600/400?random=13', pricePerNight: 3500, rating: 4.2, reviews: 2100 },
];

const HotelView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Book Premium Hotels</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Destination</label>
            <input 
              type="text" 
              placeholder="Where are you going?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Check-in</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200">
              Search Hotels
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_HOTELS.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {hotel.rating}
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{hotel.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{hotel.location}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xl font-black text-indigo-600">₹{hotel.pricePerNight.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">per night</p>
                </div>
                <button className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelView;
