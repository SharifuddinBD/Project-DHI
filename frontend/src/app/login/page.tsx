'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, User, Lock, UserCircle, Users } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<'principal' | 'guardian'>('principal')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { ...formData, loginType })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">دار</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">দারুল হিকমাহ ইনস্টিটিউট</h1>
                <p className="text-sm text-gray-600">DARUL HIKMAH INSTITUTE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-green-700">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-green-700">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
              <Link href="/login" className="text-green-700 font-semibold hover:text-green-900">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-green-800">লগইন করুন</h2>
                <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>

              {/* Login Type Selection */}
              <div className="mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setLoginType('principal')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                      loginType === 'principal'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>প্রিন্সিপাল</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('guardian')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                      loginType === 'guardian'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>অভিভাবক</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginType === 'principal' ? 'ব্যবহারকারীর নাম' : 'শিক্ষার্থীর আইডি'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={loginType === 'principal' ? 'আপনার ব্যবহারকারীর নাম' : 'শিক্ষার্থীর আইডি নম্বর'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="আপনার পাসওয়ার্ড"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">মনে রাখুন</span>
                  </label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-700">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  লগইন করুন
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    {loginType === 'principal' ? 'প্রিন্সিপাল লগইন' : 'অভিভাবক লগইন'}
                  </p>
                  {loginType === 'principal' ? (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>প্রিন্সিপাল:</strong> আপনার প্রশাসনিক প্যানেলে প্রবেশ করুন
                      </p>
                      <ul className="text-xs text-blue-700 mt-2 space-y-1">
                        <li>• শিক্ষার্থীদের তথ্য দেখুন</li>
                        <li>• পরীক্ষার ফলাফল পরিচালনা করুন</li>
                        <li>• শিক্ষক ও কর্মচারী তথ্য</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>অভিভাবক:</strong> আপনার সন্তানের তথ্য দেখুন
                      </p>
                      <ul className="text-xs text-green-700 mt-2 space-y-1">
                        <li>• পরীক্ষার ফলাফল</li>
                        <li>• উপস্থিতির তথ্য</li>
                        <li>• ফি পেমেন্ট স্ট্যাটাস</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  সাহায্য প্রয়োজন? 
                  <Link href="/contact" className="text-green-600 hover:text-green-700 ml-1">
                    যোগাযোগ করুন
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 দারুল হিকমাহ ইনস্টিটিউট. All rights reserved.</p>
            <p className="mt-2 text-gray-400">True Guidance Project - একটি প্রতিষ্ঠান</p>
          </div>
        </div>
      </footer>
    </div>
  )
}