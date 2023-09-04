import React, { Component } from 'react';
import stock from '../apis/stock';
import '../css/SearchCard.css';
import '../css/styles.css';
import { FaSearch } from 'react-icons/fa';

class SearchCard extends Component {
  state = {
    search_stockArray: [],
    loading_api: false,
    inputValue: '',
  };

  componentDidMount() {
    this.disableSearchButton();
    this.loadSavedStocks();
  }

  componentDidUpdate() {
    this.disableSearchButton();
  }

  disableSearchButton = () => {
    const { inputValue } = this.state;
    const btnDOM = document.querySelector('.btn-search');
    btnDOM.disabled = !inputValue || inputValue.length > 4;
  };

  loadSavedStocks = () => {
    if (localStorage.getItem('historyStockArray')) {
      const lsArray = JSON.parse(localStorage.getItem('historyStockArray'));
      const loadStocks = window.confirm('You have saved stocks. Would you like to load them?');
      if (loadStocks) {
        lsArray.forEach((stockCode) => this.sendSearchResult(false, stockCode));
      } else {
        localStorage.removeItem('historyStockArray');
      }
    }
  };

  sendSearchResult = async (torf, value) => {
    const stockValue = torf
      ? document.querySelector('.stock-code__value').value.toUpperCase()
      : value;

    const startDate = Math.round(new Date().getTime() / 1000);
    const endDate = startDate - 72 * 3600;

    if (this.state.search_stockArray.includes(stockValue)) {
      alert('Already exists');
      document.querySelector('.stock-code__value').value = '';
      return;
    }

    try {
      this.setState({ loading_api: true });

      const [table_response, graph_response] = await Promise.all([
        stock.get('/quote', {
          params: {
            symbol: stockValue,
            token: 'bqhq9i7rh5rbubolrqd0',
          },
        }),
        stock.get('/stock/candle', {
          params: {
            symbol: stockValue,
            resolution: 5,
            from: endDate,
            to: startDate,
            token: 'bqhq9i7rh5rbubolrqd0',
          },
        }),
      ]);

      if (
        table_response.data.c === 0 &&
        table_response.data.h === 0 &&
        table_response.data.l === 0 &&
        table_response.data.o === 0 &&
        table_response.data.pc === 0 &&
        table_response.data.t === 0
      ) {
        this.props.sendSearchGraphResult('no_data', '');
      } else {
        this.props.sendSearchGraphResult(true, {
          stockValue,
          response: graph_response.data,
        });
        this.props.sendSearchResult(table_response.data);
      }

      this.setState((prevState) => ({
        search_stockArray: [...prevState.search_stockArray, stockValue],
        loading_api: false,
        inputValue: '', 
      }));
    } catch (error) {
      console.error('API error:', error);
      this.setState({ loading_api: false });
    }
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value }, this.disableSearchButton);
  };

  render() {
    const { inputValue, loading_api } = this.state;
    return (
      <div className="card card-container search">
        <div className="card-body">
          <h2 className="h6 mb-0">Search Stock Code:</h2>
          <input
            type="text"
            className="form-control stock-code__value"
            placeholder="Stock Code (e.g. AAPL)"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button
            className="btn btn-secondary w-100 btn-search"
            onClick={() => this.sendSearchResult(true, '')}
            disabled={loading_api}
          >
            Search Results<FaSearch />
          </button>
        </div>
      </div>
    );
  }
}

export default SearchCard;
