import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PlanCard from '../components/PlanCard'
import { FileText, Target, Users, Star, ArrowRight, CheckCircle, Brain, Zap, Shield } from 'lucide-react'

const LandingPage = () => {
  const { user } = useAuth()

  const plans = [
    {
      name: 'Starter Pack',
      price: 4000,
      credits: 1,
      features: [
        'ATS-optimized resume',
        'Professional cover letter',
        'Interview Q&A guide',
        'PDF & DOCX formats',
        'Email delivery'
      ],
      paystackUrl: 'https://paystack.shop/pay/hmwg3gvs1w'
    },
    {
      name: 'Career Boost',
      price: 12500,
      credits: 5,
      features: [
        'Everything in Starter Pack',
        '5 complete resume packages',
        'LinkedIn optimization tips',
        'Industry-specific templates',
        'Priority support',
        'Multiple job applications'
      ],
      popular: true,
      paystackUrl: 'https://paystack.shop/pay/16c66t0hk0'
    },
    {
      name: 'Professional Suite',
      price: 25000,
      credits: 15,
      features: [
        'Everything in Career Boost',
        '15 complete resume packages',
        'Personal branding guide',
        'Advanced ATS analysis',
        'Executive resume templates',
        '3 months email support',
        'Career strategy consultation'
      ],
      paystackUrl: 'https://paystack.shop/pay/04alipcgbq'
    }
  ]

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary-500" />,
      title: 'AI-Powered Optimization',
      description: 'Advanced AI analyzes job descriptions and optimizes your resume for maximum impact and ATS compatibility.'
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: 'ATS-Friendly Format',
      description: 'Ensure your resume passes Applicant Tracking Systems used by 90% of companies worldwide.'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Lightning Fast',
      description: 'Get your optimized resume, cover letter, and interview guide in under 5 minutes.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: 'Secure & Private',
      description: 'Your personal information is encrypted and automatically deleted after processing.'
    }
  ]

  const testimonials = [
    {
      name: 'Adebayo Johnson',
      role: 'Software Engineer',
      image: '/api/placeholder/60/60',
      content: 'CVFixerAI helped me land 3 interviews in just 2 weeks. The ATS optimization made all the difference!'
    },
    {
      name: 'Fatima Abdul',
      role: 'Marketing Manager',
      image: '/api/placeholder/60/60',
      content: 'The cover letter template was perfect. I got called for an interview the day after applying!'
    },
    {
      name: 'Chinedu Okafor',
      role: 'Data Analyst',
      image: '/api/placeholder/60/60',
      content: 'Finally, a service that understands the Nigerian job market. Highly recommended!'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Career with{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                AI-Powered
              </span>{' '}
              Resumes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get past ATS systems and land your dream job in Nigeria with our intelligent resume optimization platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary text-lg px-8 py-4">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link to="/login" className="btn bg-white/20 hover:bg-white/30 text-white border-white/30 text-lg px-8 py-4">
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>10,000+ Resumes Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>85% ATS Pass Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>3x More Interviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CVFixerAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with deep understanding of the Nigerian job market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Affordable pricing designed for Nigerian professionals. All plans include ATS optimization, cover letters, and interview guides.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include a 7-day money-back guarantee
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>💳 Paystack Secure Payment</span>
              <span>🏦 Bank Transfer Available</span>
              <span>📱 Mobile Money Supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how CVFixerAI has helped Nigerian professionals land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Nigerian professionals who've upgraded their career prospects with CVFixerAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
                  Start Free Trial
                </Link>
                <Link to="/login" className="btn bg-white/20 hover:bg-white/30 text-white border-white/30 text-lg px-8 py-4">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage