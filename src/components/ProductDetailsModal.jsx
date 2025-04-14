import React from "react";
import CustomerInfo from "./modal-elements/CustomerInfo";
import ProductInfo from "./modal-elements/ProductInfo";
import ProofImages from "./modal-elements/ProofImages";
import StatusStepper from "./modal-elements/StatusStepper";
import productImage from "../assets/refund/image18.png";
import StatusModal from "./StatusModal";
import { FaCircleExclamation } from "react-icons/fa6";

const ProductDetailsModal = ({
    showModal,
    setShowModal,
    modalType,
    selectedItem,
    setSelectedItem,
    updateStatus,
}) => {
    const renderDetailsModal = () => {
        if (!selectedItem) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden z-10">
                    {/* Header */}
                    <div className="flex items-center p-4 border-b">
                        <div className="text-[#6E6F78] mr-2 bg-[#00AC4F]/10 rounded-full p-2">
                            <FaCircleExclamation className="text-lg" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 pl-2">
                            Product Details
                        </h3>
                        <button
                            onClick={() => setShowModal(false)}
                            className="ml-auto text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <div className="grid grid-cols-4 gap-6">
                            {/* Image */}
                            <div className="col-span-1">
                                <img
                                    src={productImage}
                                    alt="Scoot Cat Litter"
                                    className="w-full rounded shadow-sm"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="col-span-3 space-y-2">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Scoot Activated Charcoal Clumping Cat Litter
                                    10L
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Unscented; Best value, affordable price;
                                    Great odor control with no added fragrances,
                                    perfumes or dyes; Fast-forming clumps...
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {[
                                        "Cat",
                                        "Hygiene Supplies",
                                        "Cat Litter",
                                        "Variation 1",
                                    ].map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="pt-4">
                                    <span className="text-2xl font-bold text-gray-800">
                                        ₱400
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75"
                        onClick={() => setShowModal(false)}
                    ></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block align-bottom sm:align-middle sm:max-w-lg sm:w-full">
                    {modalType === "details" ? (
                        renderDetailsModal()
                    ) : (
                        <StatusModal
                            selectedItem={selectedItem}
                            setSelectedItem={setSelectedItem}
                            setShowModal={setShowModal}
                            updateStatus={updateStatus}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;
