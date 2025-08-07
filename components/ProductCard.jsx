'use client'
import React, { useEffect, useState } from 'react'

const ProductCard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://devcase.isiksoftyazilim.com/api/products?page=${pagination.currentPage}`)
        
        if (!response.ok) {
          throw new Error('Veri alınamadı')
        }
        
        const data = await response.json()
        setProducts(data.data || [])
        setPagination({
          currentPage: data.meta?.current_page || 1,
          totalPages: data.meta?.last_page || 1,
          totalItems: data.meta?.total || 0,
          itemsPerPage: data.meta?.per_page || 5
        })
      } catch (err) {
        setError(err.message)
        // API hatasında bile boş tablo yapısını koru
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [pagination.currentPage])

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Başlık ve İstatistik */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <div className="text-lg font-semibold text-gray-600">
          {loading ? '...' : pagination.totalItems.toLocaleString()} 
          <span className="text-green-500"> +2,368</span>
        </div>
      </div>

      {/* Tablo Yapısı - Her Durumda Gözükecek */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="pb-3 font-medium text-gray-500">Product</th>
              <th className="pb-3 font-medium text-gray-500">Transaction ID</th>
              <th className="pb-3 font-medium text-gray-500">Date</th>
              <th className="pb-3 font-medium text-gray-500">Amount</th>
              <th className="pb-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Yükleniyor durumu
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  Yükleniyor...
                </td>
              </tr>
            ) : error ? (
              // Hata durumu
              <tr>
                <td colSpan="5" className="py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : products.length === 0 ? (
              // Boş veri durumu
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  Gösterilecek ürün bulunamadı
                </td>
              </tr>
            ) : (
              // Normal veri durumu
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-gray-800">{product.name || '-'}</td>
                  <td className="py-4 text-gray-500">TR-{(product.id?.toString() || '').padStart(6, '0')}</td>
                  <td className="py-4 text-gray-500">
                    {product.created_at ? `Div. ${new Date(product.created_at).getDate()}_${new Date(product.created_at).getFullYear()}` : '-'}
                  </td>
                  <td className="py-4 text-gray-800">${product.price || '0'}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sayfalama - Her Durumda Gözükecek */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>
          Showing {loading ? '...' : pagination.itemsPerPage} from {loading ? '...' : pagination.totalItems} data
        </div>
        {!loading && !error && (
          <div className="flex space-x-2">
            <button 
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded">
              {pagination.currentPage}
            </span>
            <button 
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard