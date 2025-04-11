import { useEffect, useState } from "react";
import SearchSortContainer from "../components/SearchSortContainer";
import DataTable from "../components/DataTable";
import ProductDetailsModal from "../components/ProductDetailsModal";

const ProductManagement = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("Date_Added");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [isProductExpanded, setIsProductExpanded] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [pageHeaderName, setPageHeaderName] = useState("Product Management");

    // Define table columns configuration
    const tableColumns = [
        { label: "Product ID", key: "Product_ID", type: "text" },
        { label: "Product Name", key: "Product_Name", type: "text" },
        { label: "Date Added", key: "Date_Added", type: "date" },
        { label: "Last Updated", key: "Last_Updated", type: "date" },
        { label: "Status", key: "Status", type: "status" },
        {
            label: "Details",
            key: null,
            type: "button",
            buttonText: "View",
            onClick: openDetailsModal,
        },
    ];

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://retoolapi.dev/Yl8BBT/product-management"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const apiData = await response.json();
                setData(apiData);
                setError(null);
            } catch (err) {
                setError(`Failed to fetch data: ${err.message}`);
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Status tracking for timeline in details modal
    const statusItems = [
        {
            status: "Published",
            time: " ",
            active: selectedItem?.Status === "Published",
            highlight: false,
        },
        {
            status: "Unpublished",
            time: " ",
            active: selectedItem?.Status === "Unpublished",
            highlight: false,
        },
    ];

    // Handle sort change
    const handleSortChange = (key) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    // Filter data based on search term
    const filteredData = data.filter((item) => {
        if (!search.trim()) return true;

        const searchTerm = search.toLowerCase();
        return (
            (item.Product_ID &&
                item.Product_ID.toString()
                    .toLowerCase()
                    .includes(searchTerm)) ||
            (item.Product_Name &&
                item.Product_Name.toLowerCase().includes(searchTerm)) ||
            (item.Status && item.Status.toLowerCase().includes(searchTerm))
        );
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        // Handle cases where the key might not exist
        if (!a[sortKey] || !b[sortKey]) {
            // If one item is missing the sort key, push it to the end
            if (!a[sortKey]) return 1;
            if (!b[sortKey]) return -1;
            return 0;
        }

        const valueA = a[sortKey];
        const valueB = b[sortKey];

        // Special handling for date columns
        if (sortKey === "Date_Added" || sortKey === "Last_Updated") {
            const dateA = new Date(valueA);
            const dateB = new Date(valueB);
            return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        }

        // Special handling for numeric columns
        if (sortKey === "Product_ID") {
            return sortDirection === "asc"
                ? Number(valueA) - Number(valueB)
                : Number(valueB) - Number(valueA);
        }

        // Default string comparison for other columns
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();

        return sortDirection === "asc"
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
    });

    // Paginate sorted data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Modal functions
    function openDetailsModal(item) {
        setSelectedItem(item);
        setModalType("details");
        setShowModal(true);
    }

    // Update status function
    const updateStatus = async (item) => {
        try {
            const response = await fetch(
                `https://retoolapi.dev/SWvloe/refund-return-order/${item.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Status: item.Status }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedItem = await response.json();

            // Update local state
            setData(
                data.map((dataItem) =>
                    dataItem.id === updatedItem.id ? updatedItem : dataItem
                )
            );

            setShowModal(false);
        } catch (err) {
            setError(`Failed to update status: ${err.message}`);
            console.error("Error updating status:", err);
        }
    };

    // Get status class for styling
    const getStatusClass = (status) => {
        switch (status) {
            case "Published":
                return "bg-green-50 bg-opacity-10 text-green-400";
            case "Unpublished":
                return "bg-red-50 bg-opacity-10 text-red-400";
            default:
                return "bg-blue-50 bg-opacity-10 text-blue-400";
        }
    };

    return (
        <div className="container mx-12 px-6 py-8 bg-webpage-bg">
            {/* Search and Sort Component */}
            <SearchSortContainer
                search={search}
                setSearch={setSearch}
                sortKey={sortKey}
                handleSortChange={handleSortChange}
                setCurrentPage={setCurrentPage}
                filteredData={filteredData}
                pageHeaderName={pageHeaderName}
            />

            {/* Loading and Error States */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Data Table Component */}
            {!loading && !error && (
                <DataTable
                    columns={tableColumns}
                    paginatedData={paginatedData}
                    filteredData={filteredData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    startIndex={startIndex}
                    getStatusClass={getStatusClass}
                />
            )}

            {/* Modals Component */}
            <ProductDetailsModal
                showModal={showModal}
                setShowModal={setShowModal}
                modalType={modalType}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isProductExpanded={isProductExpanded}
                setIsProductExpanded={setIsProductExpanded}
                updateStatus={updateStatus}
                statusItems={statusItems}
            />
        </div>
    );
};

export default ProductManagement;
