import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Video, Users, Globe, ChevronLeft, ChevronRight, Brain } from 'lucide-react';

export function ScheduleDemoPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  // Generate available times based on date
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      const formattedHour = hour % 12 || 12;
      const period = hour < 12 ? 'AM' : 'PM';
      times.push(`${formattedHour}:00 ${period}`);
      if (hour !== 17) times.push(`${formattedHour}:30 ${period}`);
    }
    return times;
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const days = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Add empty slots for days before first of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    
    return days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to your backend
    alert('Demo scheduled successfully! You will receive a confirmation email shortly.');
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const availableTimes = generateTimeSlots();
  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 left-1/3 w-[800px] h-[800px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-12 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </a>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="grid md:grid-cols-5">
              {/* Left Panel - Info */}
              <div className="md:col-span-2 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <Brain className="h-12 w-12 text-white relative" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Schedule a Demo</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Video className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Product Demo</h3>
                      <p className="text-indigo-200">30 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Team Meeting</h3>
                      <p className="text-indigo-200">Meet with our product experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Flexible Scheduling</h3>
                      <p className="text-indigo-200">Available in your timezone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Scheduler */}
              <div className="md:col-span-3 border-l border-white/10 p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                        className="p-2 hover:bg-white/5 rounded-lg text-indigo-200 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h3 className="text-lg font-semibold text-white">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                        className="p-2 hover:bg-white/5 rounded-lg text-indigo-200 hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {weekDays.map(day => (
                        <div key={day} className="text-center text-sm font-medium text-indigo-200">
                          {day}
                        </div>
                      ))}
                      {daysInMonth.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (date) setSelectedDate(date.toISOString().split('T')[0]);
                          }}
                          disabled={!date || date < new Date()}
                          className={`
                            p-2 rounded-lg text-center transition-colors
                            ${!date ? 'invisible' : ''}
                            ${date && date < new Date() ? 'text-indigo-200/30 cursor-not-allowed' : ''}
                            ${selectedDate === date?.toISOString().split('T')[0]
                              ? 'bg-indigo-600 text-white'
                              : date && date >= new Date()
                              ? 'text-white hover:bg-white/5'
                              : ''
                            }
                          `}
                        >
                          {date?.getDate()}
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <>
                        <h4 className="font-medium text-white mb-3">Available Times</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimes.map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                setSelectedTime(time);
                                setStep(2);
                              }}
                              className="p-2 text-sm border border-white/20 rounded-lg text-indigo-200 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-indigo-200 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-indigo-200 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Team Size
                      </label>
                      <select
                        required
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      >
                        <option value="" className="bg-gray-900">Select team size</option>
                        <option value="1-10" className="bg-gray-900">1-10 employees</option>
                        <option value="11-50" className="bg-gray-900">11-50 employees</option>
                        <option value="51-200" className="bg-gray-900">51-200 employees</option>
                        <option value="201+" className="bg-gray-900">201+ employees</option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-indigo-200 hover:text-white transition-colors"
                      >
                        ← Back to calendar
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold transform hover:-translate-y-0.5 duration-200"
                      >
                        Schedule Demo
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}