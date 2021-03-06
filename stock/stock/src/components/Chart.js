import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import categories from './categories.json';
import products from './products.json';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';

class App extends Component {

  state = {
    dropdownlistCategory: null
  }

  handleDropDownChange = (e) => {
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello KendoReact!</h1>
        <p>
          <DropDownList
            data={categories}
            dataItemKey="CategoryID"
            textField="CategoryName"
            defaultItem={{CategoryID: null, CategoryName: "Product categories"}}
            onChange={this.handleDropDownChange}
            />
          &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
        </p>
      </div>
    );
  }
}

export default App;