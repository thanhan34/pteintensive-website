import { client } from '@/lib/sanity/client'

export default async function TestSanityPage() {
  let connectionStatus = 'Unknown'
  let error = null

  try {
    // Simple test query to check connection
    const result = await client.fetch('*[_type == "sanity.imageAsset"][0]')
    connectionStatus = 'Connected'
  } catch (err: any) {
    connectionStatus = 'Failed'
    error = err.message
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sanity Connection Test</h1>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Project ID:</span>
              <span className="text-gray-600">{process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set'}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Dataset:</span>
              <span className="text-gray-600">{process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set'}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">API Token:</span>
              <span className="text-gray-600">
                {process.env.SANITY_API_TOKEN ? '✓ Set' : '✗ Not set'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-medium">Connection Status:</span>
              <span className={`font-medium ${
                connectionStatus === 'Connected' ? 'text-green-600' : 'text-red-600'
              }`}>
                {connectionStatus}
              </span>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">Error Details:</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            {connectionStatus === 'Connected' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ Sanity connection is working! You can now access the Studio.
                </p>
                <div className="mt-4 space-x-4">
                  <a
                    href="/studio"
                    className="inline-flex items-center px-4 py-2 bg-[#fc5d01] text-white rounded-md hover:bg-[#fd7f33] transition-colors"
                  >
                    Open Sanity Studio
                  </a>
                  <a
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    View Blog
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
