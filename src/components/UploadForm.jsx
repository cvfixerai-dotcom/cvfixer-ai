import React, { useState } from 'react'
import { Upload, FileText, Loader } from 'lucide-react'

const UploadForm = ({ onSuccess, userCredits }) => {
  const [formData, setFormData] = useState({
    resume: null,
    jobTitle: '',
    jobDescription: '',
    resumeStream: 'Other'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
      setError('')
    } else {
      setError('Please upload a DOCX file only')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (userCredits <= 0) {
      setError('You need credits to use this service. Please purchase a plan.')
      return
    }

    if (!formData.resume || !formData.jobTitle || !formData.jobDescription) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async () => {
        const base64Resume = reader.result

        const webhookData = {
          resume: base64Resume,
          jobTitle: formData.jobTitle,
          jobDescription: formData.jobDescription,
          resumeStream: formData.resumeStream,
          timestamp: new Date().toISOString()
        }

        const response = await fetch(import.meta.env.VITE_MAIN_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        })

        const result = await response.json()

        if (response.ok) {
          onSuccess(result)
          setFormData({
            resume: null,
            jobTitle: '',
            jobDescription: '',
            resumeStream: 'Other'
          })
          // Reset file input
          document.getElementById('resume-upload').value = ''
        } else {
          throw new Error(result.message || 'Processing failed')
        }
      }

      reader.readAsDataURL(formData.resume)
    } catch (error) {
      setError('Failed to process resume: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (userCredits <= 0) {
    return (
      <div className="card p-8 text-center">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Credits Available</h3>
        <p className="text-gray-600 mb-6">You need credits to optimize your resume. Choose a plan to get started!</p>
        <button className="btn btn-primary">
          Buy Credits
        </button>
      </div>
    )
  }

  return (
    <div className="card p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Upload className="h-6 w-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900">Upload Your Resume</h2>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume (DOCX only) *
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".docx"
            onChange={handleFileChange}
            className="input"
            required
            disabled={loading}
          />
          {formData.resume && (
            <p className="text-sm text-green-600 mt-2">
              ✓ {formData.resume.name} uploaded
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="input"
            placeholder="e.g., Software Engineer"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume Stream
          </label>
          <select
            name="resumeStream"
            value={formData.resumeStream}
            onChange={handleInputChange}
            className="input"
            disabled={loading}
          >
            <option value="Finance">Finance</option>
            <option value="Tech">Technology</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            rows="6"
            className="input"
            placeholder="Paste the full job description here for better optimization..."
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Processing Resume...</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span>Optimize Resume (1 Credit)</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadForm
