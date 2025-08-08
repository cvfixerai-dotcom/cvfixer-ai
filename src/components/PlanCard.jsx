import React from 'react'
import { Check } from 'lucide-react'

const PlanCard = ({ 
  name, 
  price, 
  credits, 
  features, 
  popular = false, 
  paystackUrl 
}) => {
  const handlePayment = () => {
    window.open(paystackUrl, '_blank')
  }

  return (
    <div className={`relative card p-8 ${popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary-600">₦{price.toLocaleString()}</span>
        </div>
        <p className="text-gray-600">{credits} credits included</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handlePayment}
        className={`w-full btn ${popular ? 'btn-primary' : 'btn-secondary'}`}
      >
        Get Started
      </button>
    </div>
  )
}

export default PlanCard