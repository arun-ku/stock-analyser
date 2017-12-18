import React, { Component } from 'react';
import moment from 'moment';

class DataRow extends Component {

  render() {
    const { row, rowIndex } = this.props;
    return (
      <div>
        <div className="data-table">
          {
            row.name ? (
              <div
                className={`stock-row`}
              >
                <span className="stock-column stock-column-id"> {row.id} </span>
                <span className="stock-column stock-column-name"> {row.name} </span>
                <span className="stock-column stock-column-price"> {row.nav} </span>
                <span className="stock-column stock-column-price"> {row.repurchasePrice} </span>
                <span className="stock-column stock-column-price"> {row.salePrice} </span>
                <span className="stock-column stock-column-date"> {row.date} </span>
                <span className="stock-column stock-column-nav-calc"> {row.nav120} </span>
                <span className="stock-column stock-column-nav-calc"> {row.nav120Ratio} </span>
                <span className="stock-column stock-column-nav-calc"> {row.nav200} </span>
                <span className="stock-column stock-column-nav-calc"> {row.nav200Ratio} </span>
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