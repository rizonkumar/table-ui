import React, { useState } from "react";
import "./styles.scss";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Equal, LinkIcon, EqualNot, Fullscreen } from "lucide-react";

const mockData = Array.from({ length: 25 }, (_, i) => ({
  id: `4207${i + 1}`,
  baseProductName: `Hudson Baby Unisex Baby Mink with Faux Fur Lining Pool and Beach Robe Cover-ups ## Hudson Baby ## n/a ## Modern Botanical ## 6-12 Months ## 14.3${
    i % 10
  }`,
  competitorProductName: `Hudson Baby Unisex Baby Mink with Faux Fur Lining Pool and Beach Robe Cover-ups ## Hudson Baby ## n/a ## Modern Botanical ## 6-12 Months ## 14.3${
    i % 10
  }`,
  baseImage: `https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1_alt__en-IN.jpg?v=1694605260&width=1445`,
  competitorImage: `https://www.imagineonline.store/cdn/shop/files/iPhone_15_Blue_PDP_Image_Position-1_alt__en-IN_16b7fdd6-3b69-4b72-8445-23236e06003a.jpg?v=1694606637&width=823`,
  priceDiff: (Math.random() * 5).toFixed(2),
  errorState: i % 4 === 0 ? "equal" : i % 4 === 1 ? "not-equal" : null,
  status: i % 2 === 0,
  url: `http://example.com/product/${i + 1}`,
  comments: i % 3 === 0 ? `This is a sample comment for product ${i + 1}.` : "",
}));

// const truncateText = (text, maxLength) => {
//   if (text.length <= maxLength) return text;
//   return text.substring(0, maxLength) + "...";
// };

const ToggleSwitch = ({ checked, onChange, id }) => {
  return (
    <label htmlFor={id} className="toggle-switch">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="toggle-switch__input"
      />
      <span className="toggle-switch__slider"></span>
    </label>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(mockData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.baseProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.competitorProductName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => console.log("Refresh button clicked");
  const handleBack = () => console.log("Back button clicked");
  const handleSave = () => console.log("Save button clicked");
  const handleFilter = () => console.log("Filter button clicked");

  const handleZoomAction = (itemId) => {
    console.log("Zoom action triggered for item ID:", itemId);
  };

  const handleUrlChange = (rowIndex, newUrl) => {
    const dataIndex = data.findIndex(
      (item) => item.id === currentItems[rowIndex].id
    );
    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex].url = newUrl;
      setData(updatedData);
    }
  };

  const handleCommentsChange = (rowIndex, newComments) => {
    const dataIndex = data.findIndex(
      (item) => item.id === currentItems[rowIndex].id
    );
    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex].comments = newComments;
      setData(updatedData);
    }
  };

  const handleStatusToggle = (rowIndex) => {
    const dataIndex = data.findIndex(
      (item) => item.id === currentItems[rowIndex].id
    );
    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex].status = !updatedData[dataIndex].status;
      setData(updatedData);
    }
  };

  const handleErrorStateChange = (rowIndex, newErrorState) => {
    const dataIndex = data.findIndex(
      (item) => item.id === currentItems[rowIndex].id
    );
    if (dataIndex !== -1) {
      const updatedData = [...data];
      if (updatedData[dataIndex].errorState === newErrorState) {
        updatedData[dataIndex].errorState = null;
      } else {
        updatedData[dataIndex].errorState = newErrorState;
      }
      setData(updatedData);
    }
  };

  return (
    <div className="table-app-container">
      <div className="table-card">
        <div className="table-card__header">
          <div className="table-card__header-info">
            <h1 className="table-card__title">Target set 2</h1>
            <div className="table-card__stats">
              <span>
                Total SKUs allocated: <span className="stat-value">1000</span>
              </span>
              <span>
                SKUs Completed:{" "}
                <span className="stat-value stat-value--completed">600</span>
              </span>
              <span>
                SKUs Pending:{" "}
                <span className="stat-value stat-value--pending">200</span>
              </span>
            </div>
          </div>
          <div className="table-card__header-action-buttons">
            <button
              onClick={handleRefresh}
              className="button button--primary button--small"
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshIcon />
            </button>
            <button
              onClick={handleBack}
              className="button button--primary button--small"
            >
              Back
            </button>
          </div>
        </div>

        <div className="table-card__actions">
          <div className="search-input-container">
            <SearchIcon className="search-input__icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="action-buttons">
            <button
              onClick={handleFilter}
              className="button button--secondary button--small"
            >
              <FilterListIcon />
            </button>
            <button
              onClick={handleSave}
              className="button button--primary button--small"
            >
              Save
            </button>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="data-table">
            <thead className="data-table__head">
              <tr>
                {[
                  "Correlation ID",
                  "Base Product Name",
                  "Competitor Product Name",
                  "Base Image",
                  "Competitor Image",
                  "Price Diff.",
                  "Error",
                  "Status",
                  "URL / Comments",
                  "",
                ].map((header, idx) => (
                  <th key={idx} scope="col" className="data-table__th">
                    {header === "" ? (
                      <span className="visually-hidden">Actions</span>
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="data-table__body">
              {currentItems.length > 0 ? (
                currentItems.map((item, rowIndex) => (
                  <tr key={item.id} className="data-table__row">
                    <td className="data-table__td">{item.id}</td>
                    <td className="data-table__td data-table__td--product-name">
                      <div className="product-name-cell">
                        {/* {truncateText(
                          item.baseProductName.replace(/##/g, "\n"),
                          100
                        )} */}
                        {item.baseProductName}
                      </div>
                    </td>
                    <td className="data-table__td data-table__td--product-name">
                      <div className="product-name-cell">
                        {/* {truncateText(
                          item.competitorProductName.replace(/##/g, "\n"),
                          100
                        )} */}
                        {item.competitorProductName}
                      </div>
                    </td>
                    <td className="data-table__td">
                      <img
                        src={item.baseImage}
                        alt="Base Product"
                        className="product-image"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/80x80/f87171/ffffff?text=Error")
                        }
                      />
                    </td>
                    <td className="data-table__td">
                      <img
                        src={item.competitorImage}
                        alt="Competitor Product"
                        className="product-image"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/80x80/f87171/ffffff?text=Error")
                        }
                      />
                    </td>
                    <td className="data-table__td">{item.priceDiff}</td>
                    <td className="data-table__td data-table__td--error-actions">
                      <div className="error-actions-container">
                        <button
                          title="Mark as Equal/Match"
                          className={`error-action-button ${
                            item.errorState === "equal"
                              ? "error-action-button--active-equal"
                              : ""
                          }`}
                          onClick={() =>
                            handleErrorStateChange(rowIndex, "equal")
                          }
                        >
                          <Equal className="green-color" />
                        </button>
                        <button
                          title="Mark as Not Equal/Mismatch"
                          className={`error-action-button ${
                            item.errorState === "not-equal"
                              ? "error-action-button--active-not-equal"
                              : ""
                          }`}
                          onClick={() =>
                            handleErrorStateChange(rowIndex, "not-equal")
                          }
                        >
                          <EqualNot className="red-color" />{" "}
                        </button>
                      </div>
                    </td>
                    <td className="data-table__td">
                      <ToggleSwitch
                        id={`status-toggle-${item.id}`}
                        checked={item.status}
                        onChange={() => handleStatusToggle(rowIndex)}
                      />
                    </td>
                    <td className="data-table__td data-table__td--url-comments">
                      <LinkIcon className="url-input__icon" />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) =>
                          handleUrlChange(rowIndex, e.target.value)
                        }
                        placeholder="URL"
                        className="input-field input-field--url"
                      />
                      <textarea
                        value={item.comments}
                        onChange={(e) =>
                          handleCommentsChange(rowIndex, e.target.value)
                        }
                        placeholder="Comment"
                        rows="2"
                        className="textarea-field textarea-field--comments"
                      />
                    </td>
                    <td className="data-table__td data-table__td--action-zoom">
                      <button
                        className="button-icon"
                        onClick={() => handleZoomAction(item.id)}
                        title="View Details"
                        aria-label={`View details for correlation ID ${item.id}`}
                      >
                        <Fullscreen />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="data-table__td data-table__td--no-data"
                  >
                    No data matches your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="table-card__pagination">
            <div className="pagination__items-per-page">
              <span>Show per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="select-field"
              >
                {[5, 10, 20, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="pagination__controls">
              <span>
                Page {String(currentPage).padStart(2, "0")} of{" "}
                {String(totalPages).padStart(2, "0")}
              </span>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="button-icon pagination__button"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="button-icon pagination__button"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
