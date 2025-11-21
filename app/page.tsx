'use client';

import { useState } from 'react';
import { Car, MapPin, Users, Camera, Plus, X, Wrench, Calendar } from 'lucide-react';

interface Vehicle {
  id: string;
  type: 'car' | 'bike';
  image: string;
  make: string;
  model: string;
  year: string;
  owner: string;
  specs: string[];
  mods: string[];
  likes: number;
}

interface Meetup {
  id: string;
  title: string;
  location: string;
  date: string;
  attendees: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'meetups' | 'add'>('feed');
  const [showAddModal, setShowAddModal] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      type: 'car',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
      make: 'Nissan',
      model: 'GT-R R35',
      year: '2023',
      owner: 'SpeedDemon',
      specs: ['3.8L V6 Twin Turbo', '565 HP', 'AWD', '0-60 in 2.9s'],
      mods: ['ECU Tune', 'Carbon Fiber Hood', 'Custom Exhaust', 'Coilovers'],
      likes: 142
    },
    {
      id: '2',
      type: 'bike',
      image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
      make: 'Kawasaki',
      model: 'Ninja H2',
      year: '2024',
      owner: 'RideOrDie',
      specs: ['998cc Supercharged', '228 HP', '310 km/h top speed'],
      mods: ['Akrapovic Exhaust', 'Race ECU Flash', 'Carbon Wheels'],
      likes: 98
    },
    {
      id: '3',
      type: 'car',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      make: 'BMW',
      model: 'M4 Competition',
      year: '2022',
      owner: 'BimmerLife',
      specs: ['3.0L I6 Twin Turbo', '503 HP', 'RWD'],
      mods: ['Stage 2 Tune', 'M Performance Exhaust', 'Lowering Springs'],
      likes: 87
    }
  ]);

  const [meetups, setMeetups] = useState<Meetup[]>([
    {
      id: '1',
      title: 'Cars & Coffee',
      location: 'Downtown Parking Lot, Main St',
      date: '2025-11-25 08:00 AM',
      attendees: 45
    },
    {
      id: '2',
      title: 'Canyon Run',
      location: 'Mountain View Road',
      date: '2025-11-28 06:00 PM',
      attendees: 23
    },
    {
      id: '3',
      title: 'Bike Meet & Ride',
      location: 'Riverside Park',
      date: '2025-11-30 10:00 AM',
      attendees: 31
    }
  ]);

  const [formData, setFormData] = useState({
    type: 'car',
    make: '',
    model: '',
    year: '',
    specs: '',
    mods: '',
    image: ''
  });

  const handleLike = (id: string) => {
    setVehicles(vehicles.map(v =>
      v.id === id ? { ...v, likes: v.likes + 1 } : v
    ));
  };

  const handleAddVehicle = () => {
    if (!formData.make || !formData.model || !formData.year) return;

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      type: formData.type as 'car' | 'bike',
      image: formData.image || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      make: formData.make,
      model: formData.model,
      year: formData.year,
      owner: 'You',
      specs: formData.specs.split(',').map(s => s.trim()).filter(Boolean),
      mods: formData.mods.split(',').map(m => m.trim()).filter(Boolean),
      likes: 0
    };

    setVehicles([newVehicle, ...vehicles]);
    setShowAddModal(false);
    setFormData({ type: 'car', make: '', model: '', year: '', specs: '', mods: '', image: '' });
    setActiveTab('feed');
  };

  const handleJoinMeetup = (id: string) => {
    setMeetups(meetups.map(m =>
      m.id === id ? { ...m, attendees: m.attendees + 1 } : m
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg">
                <Car className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">CarGuy Community</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your Ride
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-6 py-3 transition-colors ${
                activeTab === 'feed'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Camera className="w-5 h-5" />
              Feed
            </button>
            <button
              onClick={() => setActiveTab('meetups')}
              className={`flex items-center gap-2 px-6 py-3 transition-colors ${
                activeTab === 'meetups'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-5 h-5" />
              Meetups
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="relative h-48 bg-gray-800">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full text-sm font-medium">
                    {vehicle.type === 'car' ? '🚗' : '🏍️'} {vehicle.type.toUpperCase()}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{vehicle.year} {vehicle.make}</h3>
                      <p className="text-gray-400">{vehicle.model}</p>
                    </div>
                    <button
                      onClick={() => handleLike(vehicle.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors"
                    >
                      ❤️ <span className="text-sm">{vehicle.likes}</span>
                    </button>
                  </div>

                  <div className="text-sm text-gray-400 mb-3">
                    by <span className="text-white font-medium">{vehicle.owner}</span>
                  </div>

                  {vehicle.specs.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                        <Car className="w-4 h-4" />
                        Specs
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.specs.map((spec, idx) => (
                          <span key={idx} className="bg-gray-800 text-xs px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {vehicle.mods.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
                        <Wrench className="w-4 h-4" />
                        Mods
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.mods.map((mod, idx) => (
                          <span key={idx} className="bg-red-900/30 text-red-400 text-xs px-2 py-1 rounded border border-red-900/50">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'meetups' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {meetups.map((meetup) => (
              <div key={meetup.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{meetup.title}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span>{meetup.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-red-500" />
                        <span>{meetup.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Users className="w-5 h-5 text-red-500" />
                        <span>{meetup.attendees} attending</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinMeetup(meetup.id)}
                      className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors font-medium"
                    >
                      Join Meetup
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add Your Ride</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Make *</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="e.g., Toyota, Ducati"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Model *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="e.g., Supra, Monster"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Year *</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2024"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Specs (comma-separated)</label>
                  <textarea
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="e.g., V8 Engine, 500 HP, AWD"
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mods (comma-separated)</label>
                  <textarea
                    value={formData.mods}
                    onChange={(e) => setFormData({ ...formData, mods: e.target.value })}
                    placeholder="e.g., Turbo Kit, Custom Exhaust, Lowered"
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddVehicle}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    Add Vehicle
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
