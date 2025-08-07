'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, deleteProduct } from '../store/productsSlice'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ProductCard = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error, pagination } = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  )

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      dispatch(fetchProducts(newPage))
    }
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id))
      setShowDeleteModal(false)
      setProductToDelete(null)
    }
  }

  useEffect(() => {
    dispatch(fetchProducts(1))
  }, [dispatch])

  const getStatusBadge = (status) => {
    const statusText = typeof status === 'boolean' 
      ? (status ? 'Aktif' : 'Pasif') 
      : (status || 'Bilinmiyor')
    
    const colorClass = status === true || status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs ${colorClass}`}>
        {statusText}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Başlık ve Araç Çubuğu */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Ürün Listesi</h2>
          <div className="text-xs text-gray-500">
            {loading ? '...' : `${pagination.totalItems.toLocaleString()} ürün`}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Ürün ara..."
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setCurrentProduct(null)
              setShowAddModal(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center justify-center gap-1 whitespace-nowrap text-sm"
          >
            <FiPlus size={14} /> Ürün Ekle
          </button>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto overflow-y-auto max-h-[350px] mb-4 rounded-md border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ürün</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Barkod</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fiyat</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-1 text-xs text-gray-500">Yükleniyor...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-xs text-red-500">
                  Hata: {error}
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-xs text-gray-500">
                  <div className="text-gray-400 text-2xl mb-1">📦</div>
                  <p>{searchTerm ? 'Aramanızla eşleşen ürün bulunamadı' : 'Henüz ürün bulunmuyor'}</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-8 w-8 rounded-full object-cover flex-shrink-0" 
                        src={product.imageUrl || '/placeholder-product.png'} 
                        alt={product.name}
                        onError={(e) => { e.target.src = '/placeholder-product.png' }}
                      />
                      <div className="ml-3">
                        <div className="text-xs font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                    {product.barcode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                    {product.stock || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => {
                          setCurrentProduct(product)
                          setShowAddModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 p-0.5"
                        title="Düzenle"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-600 hover:text-red-900 p-0.5"
                        title="Sil"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            Sayfa {pagination.currentPage} / {pagination.totalPages} • 
            Toplam {pagination.totalItems.toLocaleString()} ürün
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronLeft size={14} />
            </button>
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = pagination.currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                    pagination.currentPage === pageNum 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4">
              <div className="flex items-center justify-center w-10 h-10 mx-auto bg-red-100 rounded-full mb-3">
                <FiTrash2 className="w-5 h-5 text-red-600" />
              </div>
              
              <h3 className="text-md font-semibold text-gray-900 text-center mb-1">
                Ürünü Sil
              </h3>
              
              <p className="text-xs text-gray-500 text-center mb-4">
                "<strong>{productToDelete?.name}</strong>" ürünü silmek istediğinize emin misiniz? 
                Bu işlem geri alınamaz.
              </p>
              
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false)
                    setProductToDelete(null)
                  }}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ürün Ekleme/Düzenleme Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">
                {currentProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ürün Adı</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    defaultValue={currentProduct?.name || ''}
                    placeholder="Ürün adını girin"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Barkod</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      defaultValue={currentProduct?.barcode || ''}
                      placeholder="Barkod"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Fiyat ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      defaultValue={currentProduct?.price || ''}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Stok</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      defaultValue={currentProduct?.stock || ''}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Durum</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      defaultValue={currentProduct?.status || 'active'}
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setCurrentProduct(null)
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {currentProduct ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard