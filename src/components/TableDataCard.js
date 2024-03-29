import React from 'react';
import '../css/styles.css';
import '../css/TableDataCard.css';

class TableDataCard extends React.Component {
  state = {
    currency: '$',
  };

  render() {
    let tableDataDOM = '';

    tableDataDOM = this.props.tableData.map((table, index) => {
      if (table !== 'Symbol not supported') {
        return (
          <tr key={index}>
            <th scope="row">{this.props.graphData[index].stockValue}</th>
            <td>{new Date(table.t * 1000).toLocaleDateString()}</td>

            <td
              className={`${
                this.state.currency + table.o.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {this.state.currency + table.o.toFixed(2)}
            </td>

            <td
              className={`${
                this.state.currency + table.l.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {this.state.currency + table.l.toFixed(2)}
            </td>

            <td
              className={`${
                this.state.currency + table.h.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {this.state.currency + table.h.toFixed(2)}
            </td>

            <td
              className={`${
                this.state.currency + table.c.toFixed(2) <
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {this.state.currency + table.pc.toFixed(2)}
            </td>

            <td
              className={`${
                this.state.currency + table.c.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {this.state.currency + table.c.toFixed(2)}
            </td>

            <td
              className={`${
                this.state.currency + table.c.toFixed(2) >
                this.state.currency + table.pc.toFixed(2)
                  ? 'green-text'
                  : 'red-text'
              } font-weight-bold`}
            >
              {`${(
                100 -
                (table.pc.toFixed(2) / table.c.toFixed(2)) * 100
              ).toFixed(2)}%`}
            </td>
          </tr>
        );
      }
      return null; 
    });

    return (
      <div className="card card-container table-data">
        <div className="card-body">
          <h2 className="h6 mb-3">Latest available data:</h2>
          {this.props.showTableData ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Stock Code</th>
                    <th scope="col">Last Updated Data</th>
                    <th scope="col">Open Price</th>
                    <th scope="col">Low Price</th>
                    <th scope="col">High Price</th>
                    <th scope="col">Previous Close Price</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">% From Yesterday</th>
                  </tr>
                </thead>
                <tbody>{tableDataDOM}</tbody>
              </table>
            </div>
          ) : (
            <p className="mb-0 no-data-message">
              There is currently no available data. Please search for a stock code for more details.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default TableDataCard;
