import { Button } from 'antd';
import { ArrowRightOutlined, BookOutlined, StarOutlined, UserOutlined, ReadOutlined, RocketOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br font-plus from-slate-50 to-gray-100">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">BookStore</h1>
        <Link to="/login">
          <Button type="primary" className="bg-indigo-600 border-none hover:bg-indigo-700">
            Dashboard
          </Button>
        </Link>
      </nav>

      <section className="container mx-auto px-6 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Your Digital Library
            <span className="block text-indigo-600">Management Solution</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Organize your books, share reviews, and discover new recommendations
            in one beautiful platform.
          </p>
          <Link to="/login">
            <Button type="primary" size="large" className="h-12 px-8 text-lg bg-indigo-600 border-none hover:bg-indigo-700">
              Get Started <ArrowRightOutlined className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <BookOutlined className="text-4xl text-indigo-600" />,
                title: "Library Management",
                desc: "Efficiently organize and manage your book collection"
              },
              {
                icon: <StarOutlined className="text-4xl text-indigo-600" />,
                title: "Smart Reviews",
                desc: "Share your thoughts and read others' perspectives"
              },
              {
                icon: <UserOutlined className="text-4xl text-indigo-600" />,
                title: "Recommendations",
                desc: "Get personalized book suggestions based on your interests"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-blue-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10k+', label: 'Active Users' },
              { number: '50k+', label: 'Books Managed' },
              { number: '100k+', label: 'Reviews Shared' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center text-white p-8"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-indigo-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-50"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transform Your Reading Experience
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of book lovers who are already using our platform to enhance their reading journey.
            </p>
            <Link to="/dashboard">
              <Button type="primary" size="large" 
                className="h-14 px-10 text-lg bg-indigo-600 border-none hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all">
                Get Started Now <RocketOutlined className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">BookStore</h3>
              <p className="text-gray-400">Your complete digital library management solution.</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">FEATURES</h4>
              <ul className="space-y-2">
                <li>Library Management</li>
                <li>Book Reviews</li>
                <li>Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">CONNECT</h4>
              <div className="flex space-x-4">
                <GlobalOutlined className="text-xl hover:text-indigo-400 cursor-pointer" />
                <ReadOutlined className="text-xl hover:text-indigo-400 cursor-pointer" />
                <BookOutlined className="text-xl hover:text-indigo-400 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-sm">© 2024 BookStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
