/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import {
  Product,
  ProductFeature,
  ProductImage,
  ProductSize,
  ColourVariant,
  ProductDetails,
} from "@/lib/productTypes";
import { db } from "@/firebaseConfig/firebaseConfig";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { 
  getCategoryOptions, 
  getGenderOptions, 
  getSizeOptions, 
  getSubCategoryOptions, 
  getSubSubCategoryOptions,
  getAdminProductDefaults
} from "@/lib/contactUs/adminProduct";

export default function ProductAddPage() {
  const categoryOptions = getCategoryOptions();
  const subCategoryOptions = getSubCategoryOptions();
  const subSubCategoryOptions = getSubSubCategoryOptions();
  const genderOptions = getGenderOptions();
  const sizeOptions = getSizeOptions();
  const productDefaults = getAdminProductDefaults();
  const router = useRouter();
  const params = useSearchParams();
  const isEditMode = params?.get("edit") === "true";
  const productId = params?.get("id");

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    sku_id: "",
    name: "",
    gender: productDefaults.gender,
    category: productDefaults.category,
    subCategory: productDefaults.subCategory,
    subSubCategory: subSubCategoryOptions[0] || "Valorant",
    pricing: { mrp: "", discount: "", sellingPrice: "" },
    productDescription: {
      description: "",
      features: [],
      details: {
        material: "",
        weight: "",
        care_instructions: "",
        country_of_origin: productDefaults.countryOfOrigin,
      },
    },
    images: [],
    sizes: [],
    dateCreated: new Date().toISOString(),
    isNew: false,
    onSale: false,
  });

  const [features, setFeatures] = useState<ProductFeature[]>([]);
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [careInstructions, setCareInstructions] = useState("");
  const [origin, setOrigin] = useState(productDefaults.countryOfOrigin);
  const [sizes, setSizes] = useState<ProductSize[]>(
    sizeOptions.map(size => ({ 
      size: size as "S" | "M" | "L" | "XL" | "XXL", 
      quantity: 0, 
      colours: [] 
    }))
  );
  const [name, setName] = useState("");
  const [gender, setGender] = useState(productDefaults.gender);
  const [category, setCategory] = useState(productDefaults.category);
  const [subCategory, setSubCategory] = useState(productDefaults.subCategory);
  const [subSubCategory, setSubSubCategory] = useState(productDefaults.subSubCategory);
  const [pricing, setPricing] = useState({
    mrp: "",
    discount: "",
    sellingPrice: "",
  });
  const [description, setDescription] = useState("");
  const [skuId, setSkuId] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [comingSoon, setComingSoon] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode && productId) {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Product & {
            metaTitle?: string;
            metaDescription?: string;
            comingSoon?: boolean;
          };
          setProduct(data);
          setFeatures(data.productDescription.features);
          setMaterial(data.productDescription.details.material);
          setWeight(data.productDescription.details.weight);
          setCareInstructions(
            data.productDescription.details.care_instructions
          );
          setOrigin(data.productDescription.details.country_of_origin);
          setSizes(data.sizes);
          setCategory(data.category);
          setSubCategory(data.subCategory);
          setSubSubCategory(data.subSubCategory);
          setPricing(data.pricing);
          setDescription(data.productDescription.description);
          setSkuId(data.sku_id);
          setName(data.name);
          setImages(data.images || []);
          setMetaTitle(data.metaTitle || "");
          setMetaDescription(data.metaDescription || "");
          setComingSoon(!!data.comingSoon);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [isEditMode, productId]);

  const addImage = () => {
    setImages([...images, { imageUrl: "", altText: "" }]);
  };

  const updateImage = (
    index: number,
    field: "imageUrl" | "altText",
    value: string
  ) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const addFeature = () =>
    setFeatures([...features, { title: "", description: "" }]);
  const updateFeature = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };
  const removeFeature = (index: number) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  const addSize = () => {
    setSizes([...sizes, { size: "S", colours: [], quantity: 0 }]);
  };

  const handlePricingChange = (
    field: "mrp" | "discount" | "sellingPrice",
    value: string
  ) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    setPricing({ ...pricing, [field]: value });
  };

  const addColour = (sizeIndex: number) => {
    const updatedSizes = [...sizes];
    updatedSizes[sizeIndex].colours.push({
      colour: "",
      colourCode: "",
      quantity: 0,
    });
    setSizes(updatedSizes);
  };

  const updateColour = (
    sizeIndex: number,
    colourIndex: number,
    field: keyof ColourVariant,
    value: string | number
  ) => {
    const updatedSizes: any = [...sizes];
    updatedSizes[sizeIndex].colours[colourIndex][field] = value;
    setSizes(updatedSizes);
  };

  const removeColour = (sizeIndex: number, colourIndex: number) => {
    const updatedSizes = [...sizes];
    updatedSizes[sizeIndex].colours.splice(colourIndex, 1);
    setSizes(updatedSizes);
  };

  const handleDetailsChange = (field: keyof ProductDetails, value: string) => {
    setMaterial(field === "material" ? value : material);
    setWeight(field === "weight" ? value : weight);
    setCareInstructions(
      field === "care_instructions" ? value : careInstructions
    );
    setOrigin(field === "country_of_origin" ? value : origin);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload: Product & {
        metaTitle?: string;
        metaDescription?: string;
        comingSoon?: boolean;
      } = {
        ...product,
        sku_id: skuId,
        pricing,
        name,
        gender,
        category,
        subCategory,
        subSubCategory,
        productDescription: {
          description,
          features,
          details: {
            material,
            weight,
            care_instructions: careInstructions,
            country_of_origin: origin,
          },
        },
        images,
        sizes,
        dateCreated: new Date().toISOString(),
        metaTitle,
        metaDescription,
        comingSoon,
      };
      if (isEditMode && product.id) {
        const docRef = doc(db, "products", product.id);
        await updateDoc(docRef, payload);
      } else {
        const docRef = await addDoc(collection(db, "products"), payload);
        await updateDoc(docRef, { id: docRef.id });
      }
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error uploading product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <ResponsivePageContainer>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg font-semibold">Uploading...</div>
        </div>
      )}
      <div
        className={`p-8 space-y-6 py-10 ${
          isSubmitting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit" : "Add"} Product
        </h1>

        {/* Name Text Field */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter product name"
          />
        </div>

        {/* SKU ID Text Field */}
        <div>
          <label className="block font-semibold mb-1">SKU ID</label>
          <input
            type="text"
            value={skuId}
            onChange={(e) => setSkuId(e.target.value)}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter SKU ID"
          />
        </div>

        {/* Product Description Section */}
        <div>
          <h2 className="font-semibold mb-2">Product Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full text-black mb-4"
            placeholder="Enter product description"
            rows={4}
          />

          {/* Features Section */}
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            {features.map((f, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2"
              >
                <input
                  className="border p-2 rounded text-black"
                  placeholder="Title"
                  value={f.title}
                  onChange={(e) => updateFeature(i, "title", e.target.value)}
                />
                <input
                  className="border p-2 rounded text-black"
                  placeholder="Description"
                  value={f.description}
                  onChange={(e) =>
                    updateFeature(i, "description", e.target.value)
                  }
                />
                <button
                  onClick={() => removeFeature(i)}
                  className="text-sm text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addFeature}
              className="text-sm text-blue-600 underline mt-2"
            >
              + Add Feature
            </button>
          </div>

          {/* Details Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) =>
                    handleDetailsChange("material", e.target.value)
                  }
                  className="border p-2 rounded w-full text-black"
                  placeholder="Enter material"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) =>
                    handleDetailsChange("weight", e.target.value)
                  }
                  className="border p-2 rounded w-full text-black"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={careInstructions}
                  onChange={(e) =>
                    handleDetailsChange("care_instructions", e.target.value)
                  }
                  className="border p-2 rounded w-full text-black"
                  placeholder="Enter care instructions"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Country of Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) =>
                    handleDetailsChange("country_of_origin", e.target.value)
                  }
                  className="border p-2 rounded w-full text-black"
                  placeholder="Enter country of origin"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gender Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded w-full text-black"
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full text-black"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Sub Category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border p-2 rounded w-full text-black"
          >
            {subCategoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* SubSubCategory Dropdown */}
        <div>
          <label className="block font-semibold mb-1">Sub-Sub Category</label>
          <select
            value={subSubCategory}
            onChange={(e) => setSubSubCategory(e.target.value)}
            className="border p-2 rounded w-full text-black"
          >
            {subSubCategoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing Section */}
        <div>
          <h2 className="font-semibold mb-2">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">MRP</label>
              <input
                type="text"
                value={pricing.mrp}
                onChange={(e) => handlePricingChange("mrp", e.target.value)}
                className="border p-2 rounded w-full text-black"
                placeholder="Enter MRP"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Discount (%)</label>
              <input
                type="text"
                value={pricing.discount}
                onChange={(e) =>
                  handlePricingChange("discount", e.target.value)
                }
                className="border p-2 rounded w-full text-black"
                placeholder="Enter Discount"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Selling Price</label>
              <input
                type="text"
                value={pricing.sellingPrice}
                onChange={(e) =>
                  handlePricingChange("sellingPrice", e.target.value)
                }
                className="border p-2 rounded w-full text-black"
                placeholder="Enter Selling Price"
              />
            </div>
          </div>
        </div>

        {/* Main Images Section (manual entry) */}
        <div>
          <h2 className="font-semibold mb-2">Main Images</h2>
          <div className="space-y-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center gap-2 border p-2 rounded"
              >
                <input
                  type="text"
                  className="border p-2 rounded text-black flex-1"
                  placeholder="Image URL (e.g. /productImages/gekko/image1)"
                  value={img.imageUrl}
                  onChange={(e) => updateImage(idx, "imageUrl", e.target.value)}
                />
                <input
                  type="text"
                  className="border p-2 rounded text-black flex-1"
                  placeholder="Alt Text"
                  value={img.altText}
                  onChange={(e) => updateImage(idx, "altText", e.target.value)}
                />
                <div className="flex flex-row gap-1 items-center">
                  {/* Move Up button (not for first) */}
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...images];
                        const temp = updated[idx - 1];
                        updated[idx - 1] = updated[idx];
                        updated[idx] = temp;
                        setImages(updated);
                      }}
                      className="text-sm text-white border rounded px-2 py-1 hover:bg-gray-100"
                      title="Move Up"
                    >
                      ↑
                    </button>
                  )}
                  {/* Move Down button (not for last) */}
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...images];
                        const temp = updated[idx + 1];
                        updated[idx + 1] = updated[idx];
                        updated[idx] = temp;
                        setImages(updated);
                      }}
                      className="text-sm text-white border rounded px-2 py-1 hover:bg-gray-100"
                      title="Move Down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-sm text-red-500 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              className="text-sm text-blue-600 underline mt-2"
            >
              + Add Image
            </button>
          </div>
        </div>

        {/* Size Section */}
        <div>
          <h2 className="font-semibold">Sizes</h2>
          {sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="border p-4 rounded mb-4">
              <div className="flex items-center gap-4 mb-4">
                <select
                  value={size.size}
                  onChange={(e) => {
                    const updated = [...sizes];
                    updated[sizeIndex].size = e.target
                      .value as ProductSize["size"];
                    setSizes(updated);
                  }}
                  className="border p-2 rounded text-black"
                >
                  {sizeOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Total Quantity"
                  value={size.quantity}
                  onChange={(e) => {
                    const updated = [...sizes];
                    updated[sizeIndex].quantity = Number(e.target.value);
                    setSizes(updated);
                  }}
                  className="border p-2 rounded text-black"
                />
              </div>

              {/* Colours Section */}
              <div>
                <h3 className="font-semibold mb-2">Colours</h3>
                {size.colours.map((colour, colourIndex) => (
                  <div
                    key={colourIndex}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
                  >
                    <input
                      type="text"
                      placeholder="Colour Name"
                      value={colour.colour}
                      onChange={(e) =>
                        updateColour(
                          sizeIndex,
                          colourIndex,
                          "colour",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded text-black"
                    />
                    <input
                      type="text"
                      placeholder="Colour Code"
                      value={colour.colourCode}
                      onChange={(e) =>
                        updateColour(
                          sizeIndex,
                          colourIndex,
                          "colourCode",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded text-black"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={colour.quantity}
                      onChange={(e) =>
                        updateColour(
                          sizeIndex,
                          colourIndex,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="border p-2 rounded text-black"
                    />
                    <button
                      onClick={() => removeColour(sizeIndex, colourIndex)}
                      className="text-sm text-red-500 mt-1"
                    >
                      Remove Colour
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addColour(sizeIndex)}
                  className="text-sm text-blue-600 underline mt-2"
                >
                  + Add Colour
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addSize}
            className="text-sm text-blue-600 underline mt-2"
          >
            + Add Size
          </button>
        </div>

        {/* Meta Title and Meta Description Fields */}
        <div>
          <label className="block font-semibold mb-1">Meta Title</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter meta title for SEO"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Meta Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter meta description for SEO"
            rows={2}
          />
        </div>

        {/* Coming Soon Chip */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${
              comingSoon
                ? "bg-yellow-400 text-black border-yellow-500"
                : "bg-gray-200 text-gray-700 border-gray-300"
            }`}
          >
            Coming Soon
          </span>
          <input
            type="checkbox"
            checked={comingSoon}
            onChange={() => setComingSoon(!comingSoon)}
            className="accent-yellow-500 w-5 h-5"
            id="comingSoonCheckbox"
          />
          <label htmlFor="comingSoonCheckbox" className="text-sm">
            Mark as Coming Soon
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ResponsivePageContainer>
  );
}
