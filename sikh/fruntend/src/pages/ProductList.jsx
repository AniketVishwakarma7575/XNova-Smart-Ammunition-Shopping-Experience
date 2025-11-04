import React, { useEffect, useState } from "react";
import API from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
