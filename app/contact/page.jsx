'use client';
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Plus, X, Send, Star, Building2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuggestPlacePage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    rating: '',
    contact: {
      phone: '',
      email: '',
      address: '',
      website: '',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: ''
      }
    },
    features: [''],
    branches: [{ name: '', address: '', phone: '' }]
  });

  const [showFeatures, setShowFeatures] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);

  const categories = [
    'hotels', 'restaurants', 'shopping', 'healthcare', 'education',
    'entertainment', 'services', 'tourism', 'transport', 'sports'
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child, grandchild] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild ? {
            ...prev[parent][child],
            [grandchild]: value
          } : value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addBranch = () => {
    setFormData(prev => ({
      ...prev,
      branches: [...prev.branches, { name: '', address: '', phone: '' }]
    }));
  };

  const removeBranch = (index) => {
    if (formData.branches.length > 1) {
      setFormData(prev => ({
        ...prev,
        branches: prev.branches.filter((_, i) => i !== index)
      }));
    }
  };

  const updateBranch = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.map((branch, i) =>
        i === index ? { ...branch, [field]: value } : branch
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clean up empty features`
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      branches: formData.branches.filter(b => b.name.trim() !== '' || b.address.trim() !== '')
    };

    // Format arrays for email
    const emailData = {
      place_name: cleanedData.name,
      category: cleanedData.category,
      description: cleanedData.description,
      rating: cleanedData.rating || 'Not provided',
      phone: cleanedData.contact.phone || 'Not provided',
      email: cleanedData.contact.email || 'Not provided',
      address: cleanedData.contact.address,
      website: cleanedData.contact.website || 'Not provided',
      social_media: `
        Facebook: ${cleanedData.contact.socialMedia.facebook || 'Not provided'}
        Twitter: ${cleanedData.contact.socialMedia.twitter || 'Not provided'}
        Instagram: ${cleanedData.contact.socialMedia.instagram || 'Not provided'}
      `,
      features: cleanedData.features.length > 0 ? cleanedData.features.join(', ') : 'None',
      branches: cleanedData.branches.length > 0
        ? cleanedData.branches.map((b, i) =>
          `Branch ${i + 1}: ${b.name || 'Unnamed'}, Address: ${b.address || 'Not provided'}, Phone: ${b.phone || 'Not provided'}`
        ).join('\n')
        : 'None'
    };

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_rj73k8h', // Replace with your EmailJS Service ID
        'template_qdp61oq', // Replace with your EmailJS Template ID
        emailData,
        'omoSphEfvbW0CdTwb' // Replace with your EmailJS Public Key
      );

      console.log('Email sent successfully:', result.text);
      toast.success('Thank you for your suggestion! It has been sent for review.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });      // Reset form after successful submission
      setFormData({
        name: '',
        category: '',
        description: '',
        rating: '',
        contact: {
          phone: '',
          email: '',
          address: '',
          website: '',
          socialMedia: {
            facebook: '',
            twitter: '',
            instagram: ''
          }
        },
        features: [''],
        branches: [{ name: '', address: '', phone: '' }]
      });
      setShowFeatures(false);
      setShowBranches(false);
      setShowSocialMedia(false);
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send your suggestion. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 mt-4 md:mt-16 p-2 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--teal)] mb-4">
            Suggest a Place
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Help us grow our directory by suggesting amazing places in Quetta. Fill out the form below with as much detail as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
          {/* Basic Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-6 text-center">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Place Name - Required */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Place Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                  placeholder="Enter the name of the place"
                />
              </div>

              {/* Category - Required */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating - Optional */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                  placeholder="4.5"
                />
              </div>

              {/* Description - Required */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200 resize-none"
                  placeholder="Describe the place, its atmosphere, what makes it special..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)] mb-6 text-center">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleInputChange('contact.phone', e.target.value)}
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                    placeholder="+92 81 1234567"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                    placeholder="contact@place.com"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    value={formData.contact.website}
                    onChange={(e) => handleInputChange('contact.website', e.target.value)}
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    required
                    rows={2}
                    value={formData.contact.address}
                    onChange={(e) => handleInputChange('contact.address', e.target.value)}
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200 resize-none"
                    placeholder="Full address with area, city, and postal code"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Toggle */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowSocialMedia(!showSocialMedia)}
                className="flex cursor-pointer items-center space-x-2 text-xs sm:text-sm text-[var(--bronze)] hover:text-[var(--teal)] transition-colors duration-200"
              >
                <Plus className={`w-4 h-4 transition-transform duration-200 ${showSocialMedia ? 'rotate-45' : ''}`} />
                <span>Add Social Media Links</span>
              </button>
            </div>

            {showSocialMedia && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Facebook</label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
                    <input
                      type="url"
                      value={formData.contact.socialMedia.facebook}
                      onChange={(e) => handleInputChange('contact.socialMedia.facebook', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                      placeholder="Facebook URL"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Twitter</label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                    <input
                      type="url"
                      value={formData.contact.socialMedia.twitter}
                      onChange={(e) => handleInputChange('contact.socialMedia.twitter', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                      placeholder="Twitter URL"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-600" />
                    <input
                      type="url"
                      value={formData.contact.socialMedia.instagram}
                      onChange={(e) => handleInputChange('contact.socialMedia.instagram', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                      placeholder="Instagram URL"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)]">
                Features & Amenities
              </h2>
              <button
                type="button"
                onClick={() => setShowFeatures(!showFeatures)}
                className="flex cursor-pointer items-center space-x-2 text-xs sm:text-sm text-[var(--bronze)] hover:text-[var(--teal)] transition-colors duration-200"
              >
                <Plus className={`w-4 h-4 cursor-pointer transition-transform duration-200 ${showFeatures ? 'rotate-45' : ''}`} />
                <span className="hidden cursor-pointer sm:inline">Add Features</span>
              </button>
            </div>

            {showFeatures && (
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[var(--teal)] flex-shrink-0" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                      placeholder="e.g., Free WiFi, Air Conditioning, Swimming Pool"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex cursor-pointer items-center space-x-2 text-xs sm:text-sm text-[var(--bronze)] hover:text-[var(--teal)] transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Feature</span>
                </button>
              </div>
            )}
          </div>

          {/* Branches Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--teal)]">
                Branches/Locations
              </h2>
              <button
                type="button"
                onClick={() => setShowBranches(!showBranches)}
                className="flex items-center space-x-2 text-xs sm:text-sm text-[var(--bronze)] hover:text-[var(--teal)] transition-colors duration-200"
              >
                <Plus className={`w-4 h-4 cursor-pointer transition-transform duration-200 ${showBranches ? 'rotate-45' : ''}`} />
                <span className="hidden sm:inline">Add Branches</span>
              </button>
            </div>

            {showBranches && (
              <div className="space-y-4 sm:space-y-6">
                {formData.branches.map((branch, index) => (
                  <div key={index} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-[var(--bronze)]" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          Branch {index + 1}
                        </span>
                      </div>
                      {formData.branches.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBranch(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Branch Name</label>
                        <input
                          type="text"
                          value={branch.name}
                          onChange={(e) => updateBranch(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                          placeholder="e.g., Main Branch, Downtown Location"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={branch.phone}
                          onChange={(e) => updateBranch(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                          placeholder="+92 81 1234567"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={branch.address}
                          onChange={(e) => updateBranch(index, 'address', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--teal)]/20 focus:border-[var(--teal)] transition-all duration-200"
                          placeholder="Branch address"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBranch}
                  className="flex items-center cursor-pointer space-x-2 text-xs sm:text-sm text-[var(--bronze)] hover:text-[var(--teal)] transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Branch</span>
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-6 sm:p-8 lg:p-10">
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 border border-[var(--bronze)] text-[var(--foreground)] text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-[var(--bronze)] transform hover:scale-105 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit Suggestion</span>
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                We'll review your suggestion and add it to our directory if approved.
              </p>
            </div>
          </div>
        </form>

        <div className="h-8 sm:h-12" />
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]" />
      </div>
    </div>
  );
}