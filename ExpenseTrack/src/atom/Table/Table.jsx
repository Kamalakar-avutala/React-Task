import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const getItemsPerPage = () => {
  const parsed = parseInt(import.meta.env.VITE_PAGINATION_ITEMS_PER_PAGE);
  return Number.isNaN(parsed) ? 5 : parsed;
};


const Table = ({
  data,
  columns,
  onRowClick,
  isLoading,
  striped = true,
  hover = true,
  responsive = true,
  size = 'md',
  emptyMessage = 'No data available',
  className = '',
  itemsPerPage = getItemsPerPage(),
}) => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  if (isLoading) {
    return (
      <div className='d-flex justify-content-center p-4'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  // Sort and filter data
  useEffect(() => {
    let filtered = data.filter(item =>
      columns.some(column =>
        String(item[column.key])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortConfig.direction === 'asc' ? comparison : -comparison;
        } else {
          const comparison = aValue - bValue;
          return sortConfig.direction === 'asc' ? comparison : -comparison;
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchTerm, columns, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!data || data.length === 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.headerClassName}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length} className='text-center'>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  const tableClasses = [
    'table',
    striped && 'table-striped',
    hover && 'table-hover',
    size && `table-${size}`,
    className
  ].filter(Boolean).join(' ');

  const tableContent = (
    <table className={tableClasses}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{ 
                width: column.width,
                cursor: 'pointer'
              }}
              className={column.headerClassName}
              onClick={() => {
                setSortConfig({
                  key: column.key,
                  direction:
                    sortConfig.key === column.key && sortConfig.direction === 'asc'
                      ? 'desc'
                      : 'asc',
                });
              }}
            >
              {column.title}
              {sortConfig.key === column.key && (
                <span className='ms-1'>
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentItems.map((row, rowIndex) => (
          <tr
            key={row.id ?? rowIndex}  // use row.id if present, else fallback to index
            onClick={() => onRowClick && onRowClick(row)}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((column) => (
              <td
                key={`${row.id ?? rowIndex}-${column.key}`}
                className={column.cellClassName}
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  //pagination and search
  const paginationContent = (
    <div className='d-flex justify-content-between align-items-center my-3'>
      <div className='d-flex align-items-center'>
        <input
          type='text'
          className='form-control me-2'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <nav>
        <ul className='pagination mb-0'>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className='page-link'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className='page-link'
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className='page-link'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return responsive ? (
    <div>
      {paginationContent}
      <div className='table-responsive'>{tableContent}</div>
    </div>
  ) : (
    <div>
      {paginationContent}
      {tableContent}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.string,
      render: PropTypes.func,
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string
    })
  ).isRequired,
  onRowClick: PropTypes.func,
  isLoading: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  itemsPerPage: PropTypes.number
};

export default Table;
