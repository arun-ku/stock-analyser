import React, { Component } from 'react';

class MainTable extends Component {

  render() {
    const { stockInfo } = this.props;
    const { min120, max120, min200, max200 } = stockInfo;
    const avg120 = Number((min120 + ((max120 - min120)/2)));
    const avg200 = Number((min200 + ((max200 - min200)/2)));
    const x120 = Number((avg120 - min120));
    const x200 = Number((avg200 - min200));
    const xFactor120 = (x120 / 5);
    const xFactor200 = (x200 / 5);

    if (!stockInfo || !Object.keys(stockInfo).length) {
      return <span />
    }

    return (
      <div>
        <h2>{stockInfo.name}</h2>
        <div className="analytics-table-container">
          <div>
            <h4>Basic Info</h4>
            <table border="1" cellSpacing="0" cellPadding="2">
              <tbody>
              <tr>
                <td></td>
                <td>NAV 120/ NAV</td>
                <td>NAV 200/ NAV</td>
              </tr>
              <tr>
                <td>Max</td>
                <td>{(max120).toTwoDecimals()}</td>
                <td>{(max200).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>Min</td>
                <td>{(min120).toTwoDecimals()}</td>
                <td>{(min200).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>Avg(max - min)</td>
                <td>{(avg120).toTwoDecimals()}</td>
                <td>{(avg200).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>X(avg - min)</td>
                <td>{(x120).toTwoDecimals()}</td>
                <td>{(x200).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>X/5</td>
                <td>{(xFactor120).toTwoDecimals()}</td>
                <td>{(xFactor200).toTwoDecimals()}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Values to Invest at</h4>
            <table border="1" cellSpacing="0" cellPadding="2">
              <tbody>
              <tr>
                <td>S. No.</td>
                <td>NAV 120/ NAV</td>
                <td>NAV 200/ NAV</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{(min120 + (xFactor120 * 4)).toTwoDecimals()}</td>
                <td>{(min200 + (xFactor200 * 4)).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{(min120 + (xFactor120 * 3)).toTwoDecimals()}</td>
                <td>{(min200 + (xFactor200 * 3)).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>3</td>

                <td>{(min120 + (xFactor120 * 2)).toTwoDecimals()}</td>
                <td>{(min200 + (xFactor200 * 2)).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{(min120 + (xFactor120 * 1)).toTwoDecimals()}</td>
                <td>{(min200 + (xFactor200 * 1)).toTwoDecimals()}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{(min120).toTwoDecimals()}</td>
                <td>{(min200).toTwoDecimals()}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MainTable;


