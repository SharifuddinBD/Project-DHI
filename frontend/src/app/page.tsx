import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, BookOpen, Users, Award, Clock } from 'lucide-react'

export default function Home() {
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
              <Link href="/" className="text-green-700 font-semibold hover:text-green-900">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-green-700">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">দারুল হিকমাহ ইনস্টিটিউট</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            দ্বীনি ও জাগতিক শিক্ষার সমন্বয়ে আধুনিক পাঠ্যক্রমে পরিচালিত একটি ন্যাশনাল ধর্মীয় দ্বীনি শিক্ষা প্রতিষ্ঠান
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/about" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Learn More
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">আমাদের বৈশিষ্ট্যসমূহ</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-green-800 mb-3">হিফজুল কোরআন</h4>
              <p className="text-gray-600">সহজ ও আধুনিক পদ্ধতিতে পবিত্র কোরআন মুখস্থ করানো হয়।</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-green-800 mb-3">নাযেরা</h4>
              <p className="text-gray-600">কোরআন শুদ্ধভাবে পড়া শেখানো হয়।</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-green-800 mb-3">মাদানী নেসাব</h4>
              <p className="text-gray-600">ইসলামী শিক্ষার সাথে সাথে আধুনিক শিক্ষাও প্রদান করা হয়।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">কোর্স বিবরণ</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-semibold text-green-800 mb-4">হিফজুল কোরআন ও নাহেরা বিভাগের বৈশিষ্ট্যাবলী:</h4>
              <ul className="space-y-3 text-gray-700">
                <li>• অনারভিত্তিক ও নিজস্ব পরিবেশে ব্যবস্থা</li>
                <li>• প্রতি ১০/১২ জন ছাত্রের জন্য একজন অভিজ্ঞ ও প্রশিক্ষণপ্রাপ্ত শিক্ষকের দ্বারা নিয়মিত তত্ত্বাবধান</li>
                <li>• হিফজের সাথে সাথে সাধারণ শিক্ষা প্রদান</li>
                <li>• বিশেষ পরিচর্যা প্রাপ্ত ইয়াতিম শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-semibold text-green-800 mb-4">কিতাব বিভাগের বৈশিষ্ট্যাবলী:</h4>
              <ul className="space-y-3 text-gray-700">
                <li>• জেনারেল শিক্ষা ও মাদানী নেসাব সমন্বিত পাঠ্যক্রম</li>
                <li>• প্রথম বর্ষেই শিক্ষার্থীদের আরবি প্রবন্ধ লেখা, আরবি বক্তৃতা ও কিতাব বোঝার যোগ্যতা অর্জন</li>
                <li>• দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা যুগ সহকারে পাঠদান</li>
                <li>• আধুনিক সিলেবাস-সিলেবাস ও পথনির্দেশ মাধ্যমে আরবি ব্যাকরণ শিক্ষা</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Session Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">ভর্তি বিজ্ঞপ্তি</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <p className="font-semibold">হিফজুল কোরআন বিভাগ</p>
                <p>২৫শে শাবান ১৪৪৬ হি./২৫শে ফেব্রুয়ারি ২০২৫ হি শনিবার থেকে</p>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <p className="font-semibold">কিতাব বিভাগ</p>
                <p>৮ই শাওয়াল ১৪৪৬ হি./৭ই এপ্রিল ২০২৫ হি সোমবার থেকে</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">যোগাযোগ করুন</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3" />
              <p className="font-semibold">Address</p>
              <p>Shubheccha 364/B, Abidabad, Sheikhghat, Sylhet</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3" />
              <p className="font-semibold">Phone</p>
              <p>+880 1318-043304</p>
              <p>+880 1843-458020</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3" />
              <p className="font-semibold">Email</p>
              <p>darulhikmahinstituee.edu.bd@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Facebook className="w-8 h-8 mb-3" />
              <p className="font-semibold">Facebook</p>
              <p>https://www.facebook.com/DarulHikmahInstitute.edu</p>
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