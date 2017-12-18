import React, { Component } from 'react';

class DataRow extends Component {

  render() {
    const { row, rowIndex, handleRowClick, selectedRowId, handleGoClick } = this.props;
    return (
      <div>
        <div>
          {
            row.name ? (
              <div
                className={`stock-row ${selectedRowId === row.id ? 'stock-row-selected' : ''}`}
                onClick={() => handleRowClick(row.id)}
              >
                <div
                  className="select-wrapper"
                  onClick={() => {handleGoClick(row.id)}}
                >Go</div>
                <span className="stock-column stock-column-id"> {row.id} </span>
                <span className="stock-column stock-column-name"> {row.name} </span>
                <span className="stock-column stock-column-price"> {row.nav} </span>
                <span className="stock-column stock-column-price"> {row.repurchasePrice} </span>
                <span className="stock-column stock-column-price"> {row.salePrice} </span>
                {/*<span className="stock-column stock-column-date"> {row.date} </span>*/}
                {/*<span className="stock-column stock-column-nav-calc"> {row.nav120 && row.nav120.toFixed(2)} </span>*/}
                {/*<span className="stock-column stock-column-nav-calc"> {row.nav200 && row.nav200.toFixed(2)} </span>*/}
              </div>
            ) : <div className="group-title">
              {rowIndex >= 5 || rowIndex === 2 ? row.id : ''}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default DataRow;