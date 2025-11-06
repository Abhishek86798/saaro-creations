'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

interface FormData {
  fullName: string;
  phoneNumber: string;
  projectDescription: string;
  rooms: string[];
  otherRoom: string;
  colorPreferences: string[];
  spaceUsers: string[];
}

const roomOptions = [
  { id: 'living-room', label: 'Living Room' },
  { id: 'family-room', label: 'Family Room' },
  { id: 'dining-room', label: 'Dining Room' },
  { id: 'verandah', label: 'Verandah' },
  { id: 'open-concepts', label: 'Open Concepts' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'studio', label: 'Studio' },
  { id: 'home-office', label: 'Home Office' },
  { id: 'entryway', label: 'Entryway' },
  { id: 'other-room', label: 'Other Room' },
  { id: 'kids-bedroom', label: "Kid's Bedroom" },
  { id: 'playroom', label: 'Playroom' },
  { id: 'outer-space', label: 'Outer Space' },
  { id: 'bathroom-styling', label: 'Bathroom(Styling)' }
];

const colorPreferenceOptions = [
  { id: 'mostly-neutrals', label: 'Mostly Neutrals' },
  { id: 'neutrals-with-pops', label: 'Neutrals with pops of Colours' },
  { id: 'lots-of-colours', label: 'Lots of Colours' },
  { id: 'open-to-suggestions', label: 'Open to Suggestions' }
];

const spaceUserOptions = [
  { id: 'adults', label: 'Adults' },
  { id: 'kids-boys', label: 'Kids(Boys)' },
  { id: 'kids-girls', label: 'Kids(Girls)' },
  { id: 'kids-mixed', label: 'Kids(mixed)' },
  { id: 'pets', label: 'Pets' }
];

export function InteriorServicesClient() {
  const [formData, setFormData] = React.useState<FormData>({
    fullName: '',
    phoneNumber: '',
    projectDescription: '',
    rooms: [],
    otherRoom: '',
    colorPreferences: [],
    spaceUsers: []
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleCheckboxChange = (field: 'rooms' | 'colorPreferences' | 'spaceUsers', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: '',
        phoneNumber: '',
        projectDescription: '',
        rooms: [],
        otherRoom: '',
        colorPreferences: [],
        spaceUsers: []
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Interior Services</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/images/services/design-talks-banner.jpg"
          alt="The Design Talk - Get expert design assistance from our experts"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-playfair mb-4">
              THE DESIGN TALK
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide">
              GET EXPERT DESIGN ASSISTANCE FROM OUR EXPERTS
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Fill this form to help our designer to understand your requirement <br />
            <span className="text-blue-600 font-medium">before getting on the call.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-900 font-medium mb-3">
              Full Name?
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-900 font-medium mb-3">
              Phone Number?
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="projectDescription" className="block text-gray-900 font-medium mb-3">
              How can we help? Tell us about your project, space and style. How can we help you design your space? *
            </label>
            <textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder="Your Answer"
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            />
          </div>

          {/* What rooms are we working on? */}
          <div>
            <label className="block text-gray-900 font-medium mb-4">
              What rooms are we working on?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {roomOptions.map((room) => (
                <label
                  key={room.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.rooms.includes(room.id)}
                    onChange={() => handleCheckboxChange('rooms', room.id)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                    {room.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* If other, please describe */}
          {formData.rooms.includes('other-room') && (
            <div>
              <label htmlFor="otherRoom" className="block text-gray-900 font-medium mb-3">
                If other, please describe.
              </label>
              <input
                type="text"
                id="otherRoom"
                value={formData.otherRoom}
                onChange={(e) => setFormData({ ...formData, otherRoom: e.target.value })}
                placeholder="Your Answer"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Color Preferences */}
          <div>
            <label className="block text-gray-900 font-medium mb-4">
              What are your color preferences? Choose all that apply.
            </label>
            <div className="space-y-3">
              {colorPreferenceOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.colorPreferences.includes(option.id)}
                    onChange={() => handleCheckboxChange('colorPreferences', option.id)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Who uses this space? */}
          <div>
            <label className="block text-gray-900 font-medium mb-4">
              Who uses this space? Choose all that apply.
            </label>
            <div className="space-y-3">
              {spaceUserOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.spaceUsers.includes(option.id)}
                    onChange={() => handleCheckboxChange('spaceUsers', option.id)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-12 py-4 bg-black text-white font-medium rounded hover:bg-gray-800 transition-all flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Submitting...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Submitted Successfully!</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">
                Thank you! Our design team will contact you soon.
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair text-gray-900 mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Our expert designers are here to help you create the home of your dreams. 
            From concept to completion, we&apos;ll guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stores"
              className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Visit Our Studio
            </Link>
            <a
              href="tel:+919921125000"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
