'use client'
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Users, 
  MapPin, 
  BookOpen, 
  UserCheck,
  Upload,
  FileText,
  Phone,
  Calendar,
  Home
} from 'lucide-react';

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    guardianName: '',
    currentAddress: '',
    permanentAddress: '',
    class: '',
    teacherName: '',
    phoneNumber: '',
    birthDate: '',
    bloodGroup: '',
    previousEducation: '',
    medicalConditions: '',
    emergencyContact: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSameAddressToggle = () => {
    setSameAddress(!sameAddress);
    if (!sameAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['studentName', 'fatherName', 'motherName', 'guardianName', 'currentAddress', 'permanentAddress', 'class', 'teacherName', 'phoneNumber', 'birthDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }
    
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Navigate back');
  };

  const classOptions = [
    { value: 'madani-first', label: 'মাদানি নেসাব প্রথম বর্ষ' },
    { value: 'hifz', label: 'হিফয' },
    { value: 'nazera', label: 'নাজেরা' },
    { value: 'qaida', label: 'কায়দা' }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">সফলভাবে নিবন্ধিত!</h3>
            <p className="text-gray-600 mb-4">নতুন শিক্ষার্থী সফলভাবে নিবন্ধিত হয়েছে।</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormData({
                    studentName: '',
                    fatherName: '',
                    motherName: '',
                    guardianName: '',
                    currentAddress: '',
                    permanentAddress: '',
                    class: '',
                    teacherName: '',
                    phoneNumber: '',
                    birthDate: '',
                    bloodGroup: '',
                    previousEducation: '',
                    medicalConditions: '',
                    emergencyContact: ''
                  });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                নতুন শিক্ষার্থী যোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                ফিরে যান
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">নতুন শিক্ষার্থী নিবন্ধন</h1>
                <p className="text-gray-600">দারুল হিকমাহ ইনস্টিটিউট</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">আজকের তারিখ</p>
              <p className="font-semibold text-gray-800">১২ জুলাই, ২০২৫</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">ব্যক্তিগত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    শিক্ষার্থীর নাম *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="শিক্ষার্থীর পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জন্ম তারিখ *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="পিতার পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="মাতার পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    অভিভাবকের নাম *
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="অভিভাবকের পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">যোগাযোগের তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জরুরি যোগাযোগ
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="জরুরি অবস্থায় যোগাযোগের নম্বর"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">ঠিকানা</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বর্তমান ঠিকানা *
                  </label>
                  <textarea
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="বর্তমান ঠিকানা বিস্তারিত লিখুন"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAddress}
                    onChange={handleSameAddressToggle}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="sameAddress" className="text-sm text-gray-700">
                    স্থায়ী ঠিকানা বর্তমান ঠিকানার মতোই
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    স্থায়ী ঠিকানা *
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="স্থায়ী ঠিকানা বিস্তারিত লিখুন"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">শিক্ষাগত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ক্লাস নির্বাচন *
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">ক্লাস নির্বাচন করুন</option>
                    {classOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জিম্মাদার উস্তাজের নাম *
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="জিম্মাদার উস্তাজের নাম লিখুন"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পূর্ববর্তী শিক্ষা প্রতিষ্ঠান
                  </label>
                  <input
                    type="text"
                    name="previousEducation"
                    value={formData.previousEducation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="পূর্ববর্তী শিক্ষা প্রতিষ্ঠানের নাম (যদি থাকে)"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">স্বাস্থ্য সংক্রান্ত তথ্য</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বিশেষ স্বাস্থ্য সমস্যা (যদি থাকে)
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="কোন বিশেষ স্বাস্থ্য সমস্যা বা অ্যালার্জি থাকলে লিখুন"
                />
              </div>
            </div>

            {/* Teacher Signature Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">উস্তাজের সাক্ষর</h2>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  জিম্মাদার উস্তাজের সাক্ষর এবং অনুমোদন প্রয়োজন
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">সাক্ষরের ছবি আপলোড করুন</p>
                  <p className="text-xs text-gray-500 mt-1">অথবা হস্তলিখিত সাক্ষর নিন</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                নিবন্ধন সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal />
    </div>
  );
};

export default StudentRegistrationForm;