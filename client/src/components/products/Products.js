import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

function Products({ categories, filtered, products, setProducts, search }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate("");

  return (
    <div className="product-wrapper grid gap-4 grid-cols-card mb-5">
      {filtered
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )

        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-600 flex justify-center items-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl hover:opacity-90 h-44 flex items-center justify-center" />
      </div>
      <div
        onClick={() => navigate("/products")}
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-600 flex justify-center items-center"
      >
        <EditOutlined className="text-white md:text-2xl hover:opacity-90 h-44 flex items-center justify-center" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setProducts={setProducts}
        products={products}
      />
    </div>
  );
}

export default Products;
