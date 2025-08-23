<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        image: 'https://via.placeholder.com/50',
        name: 'PVC Wire Cable (Red Colour)',
        category: 'Electrician',
        price: '₹2499'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/50',
        name: 'Havelis 9W LED Bulb',
        category: 'Electrician',
        price: '₹2499'
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/50',
        name: 'UPVC Plumbing Pipe (Schedule - 40) - 40mm(1/12")',
        category: 'Plumber',
        price: '₹2499'
      },
      {
        id: 4,
        image: 'https://via.placeholder.com/50',
        name: 'Asian Points Ultima Weather Proof Exterior Emulsion 41TR (White)',
        category: 'Painter',
        price: '₹2499'
      },
      {
        id: 5,
        image: 'https://via.placeholder.com/50',
        name: 'UXCEL Push Sieave Cover Wall Point Painting Brush Roller',
        category: 'Painter',
        price: '₹2499'
      }
    ];
    setProducts(mockProducts);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      {/* Search and Add New Product */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by Product Name, Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FiPlus className="mr-2" />
          Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr.No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
          </span>{' '}
          of <span className="font-medium">{filteredProducts.length}</span> Entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
=======
import React, { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import pvc from "../../../assets/images/pvc.png";
import { IoClose } from "react-icons/io5";

const productData = [
    { id: 1, name: "PVC Wire Cable (Red Colour)", category: "Electrician", price: "₹499", status: "Add By Admin" },
    { id: 2, name: "Havells 9W LED Bulb", category: "Electrician", price: "₹499", status: "Pending" },
    { id: 3, name: "{UPVC Plumbing Pipe (Schedule - 40) - 40mm(1.1/2)}", category: "Plumber", price: "₹499", status: "Approved" },
    { id: 4, name: "Asian Paints Ultima Weather Proof Exterior Emulsion 4 LTR (White)", category: "Painter", price: "₹499", status: "Approved" },
    { id: 5, name: "UXCELL Plush Sleeve Cover Wall Paint Painting Brush Roller", category: "Painter", price: "₹499", status: "Add By Admin" },
    // Repeat for testing
    ...Array(10).fill().map((_, i) => ({
        id: i + 6,
        name: `Product ${i + 6}`,
        category: i % 2 === 0 ? "Electrician" : "Plumber",
        price: "₹499",
        status: "Pending"
    }))
];

const expertiseList = ["Electrician", "Plumber", "Tiler", "Painter", "AC & Refrigerator Mechanic"];

export default function SmallProductList({ productId }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showDeletePanel, setShowDeletePanel] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const removeFilter = (filter) => {
        setActiveFilters(activeFilters.filter((item) => item !== filter));
    };

    const resetFilters = () => {
        setActiveFilters([]);
        setSearchTerm("");
    };

    const toggleFilter = (item) => {
        setActiveFilters((prev) =>
            prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
        );
    };

    const handleDelete = () => {
        console.log("Item deleted!");
        setShowDeletePanel(false);
    };

    // Apply filters and search
    const filteredData = productData.filter((p) => {
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(p.category);
        const matchesSearch = searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Reset to first page when filter/search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters, searchTerm]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="p-2 font-[Poppins]">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white px-4 py-3 rounded-lg shadow">
                <h2 className="text-xl font-medium">Small Product List</h2>

                <div className="relative w-full max-w-xs flex-grow md:flex-grow-0">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 bg-[#E4E5EB] text-[#001580] font-medium placeholder-[#001580] py-1 border-2 border-[#001580] rounded-full focus:outline-none"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001580]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                </div>

                <button
                    onClick={() => navigate("/admin/smallproduct/add")}
                    className="w-[200px] bg-[#001580] text-white font-medium px-4 py-2 rounded-lg"
                >
                    + Add New Product
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="relative flex flex-wrap gap-2 mb-4">
                    {/* Filter Icon */}
                    <svg
                        onClick={() => setShowFilterPanel(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        className="cursor-pointer"
                    >
                        <path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10V30C40 35.5228 35.5228 40 30 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#E4E5EB" />
                        <path d="M16.8571 20.506C14.3701 18.646 12.5961 16.6 11.6271 15.45C11.3271 15.094 11.2291 14.833 11.1701 14.374C10.9681 12.802 10.8671 12.016 11.3281 11.508C11.7891 11 12.6041 11 14.2341 11H25.7661C27.3961 11 28.2111 11 28.6721 11.507C29.1331 12.015 29.0321 12.801 28.8301 14.373C28.7701 14.832 28.6721 15.093 28.3731 15.449C27.4031 16.601 25.6261 18.651 23.1331 20.514C23.0178 20.6037 22.9225 20.7165 22.8533 20.8451C22.7841 20.9737 22.7425 21.1154 22.7311 21.261C22.4841 23.992 22.2561 25.488 22.1141 26.244C21.8851 27.466 20.1541 28.201 19.2261 28.856C18.6741 29.246 18.0041 28.782 17.9331 28.178C17.6676 25.8765 17.4429 23.5705 17.2591 21.261C17.2488 21.114 17.2077 20.9708 17.1385 20.8407C17.0692 20.7106 16.9733 20.5966 16.8571 20.506Z" stroke="#001580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {showFilterPanel && (
                        <div className="absolute left-0 top-14 bg-white rounded-lg shadow-lg px-4 py-2 w-70 border border-gray-300 z-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Expertise</h3>
                                <button onClick={() => setShowFilterPanel(false)} className="text-gray-600 hover:text-gray-800 text-2xl">
                                    <IoClose />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {expertiseList.map((item) => (
                                    <label key={item} className="flex items-center space-x-2 cursor-pointer text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-[#001580] border-gray-300 rounded"
                                            checked={activeFilters.includes(item)}
                                            onChange={() => toggleFilter(item)}
                                        />
                                        <span>{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeFilters.map((filter) => (
                        <span key={filter} className="px-3 py-1 bg-[#E4E5EB] text-[#001580] font-medium rounded-full flex items-center gap-1">
                            {filter}
                            <button onClick={() => removeFilter(filter)} className="text-[#001580] font-semibold ml-1">
                                <IoClose />
                            </button>
                        </span>
                    ))}
                    {activeFilters.length > 0 && (
                        <button onClick={resetFilters} className="w-[200px] ml-auto border border-[#001580] bg-[#CECEF2] text-[#001580] font-medium px-6 py-2 rounded-lg">
                            Reset Filter
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="border border-[#616666] rounded-lg shadow-sm overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead>
                            <tr className="bg-[#E4E5EB] text-center text-[#001580] font-medium">
                                <th className="px-2 py-3">Sr.No.</th>
                                <th className="px-2 py-3">Product Image</th>
                                <th className="px-2 py-3">Product Name</th>
                                <th className="px-2 py-3">Product For</th>
                                <th className="px-2 py-3">Product Price</th>
                                <th className="px-2 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((product, idx) => (
                                <tr key={product.id} className="text-center">
                                    <td className="p-3">{startIndex + idx + 1}</td>
                                    <td className="p-3 flex justify-center">
                                        <img src={pvc} alt="Product" className="w-14 h-14 rounded border border-[#007E74] p-0.5 " />
                                    </td>
                                    <td className="p-3 max-w-60">{product.name}</td>
                                    <td className="p-3">{product.category}</td>
                                    <td className="p-3">{product.price}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => navigate(`/admin/smallproduct/view/${product.id}`)}>
                                            <Eye className="text-red-600" size={20} />
                                        </button>
                                        <button onClick={() => navigate(`/admin/smallproduct/edit/${product.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#EC2D01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#EC2D01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <button>
                                            <Trash2 className="text-red-600" size={20} onClick={() => setShowDeletePanel(true)} />

                                            {/* Delete Confirmation Panel */}
                                            {showDeletePanel && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-0 z-50">
                                                    <div className="bg-white rounded-2xl shadow-md p-10 w-[496px] h-[264px] text-center">
                                                        <h2 className="text-[#001580] text-2xl font-bold mb-6">Delete Item</h2>
                                                        <p className="text-[#616666] text-xl mb-8 px-6">
                                                            Are you sure you want to delete this item? This action cannot be undone.
                                                        </p>

                                                        <div className="flex justify-center gap-4">
                                                            <button
                                                                onClick={() => setShowDeletePanel(false)}
                                                                className="w-[200px] border border-[#001580] text-[#001580] font-medium px-4 py-2 rounded-lg bg-[#CECEF2]"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={handleDelete}
                                                                className="w-[200px] bg-[#001580] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#001580]"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 bg-[#F5F5F5] rounded-lg py-2 px-4">
                    <span className="text-sm font-semibold">Showing {paginatedData.length} of {filteredData.length} Entries</span>
                    <div className="flex items-center space-x-2">
                        <button onClick={handlePrev} disabled={currentPage === 1} className={`w-8 h-8 flex items-center justify-center rounded-xl ${currentPage === 1 ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#001580]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold ${page === currentPage ? "bg-[#001580] text-white" : "bg-[#CECEF2] text-[#001580] hover:bg-[#CECEF2]"}`}>
                                    {page}
                                </button>
                            );
                        })}

                        <button onClick={handleNext} disabled={currentPage === totalPages} className={`w-8 h-8 flex items-center justify-center rounded-xl ${currentPage === totalPages ? "bg-gray-200 text-[#001580]" : "bg-white hover:bg-gray-100"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-[#001580]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
>>>>>>> da79b5247530ed0d65ad53b8d43243d2b67fecb1
