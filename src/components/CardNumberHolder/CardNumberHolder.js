import React, { Component } from 'react';
import CardNumberInput from './CardNumberInput.js';

class CardNumberHolder extends Component {
  state = {
    cardNumber: ''
  };
  handleChange = value => {
    this.setState({ cardNumber: value });
  };
  render() {
    return (
      <CardNumberInput
        cardNumber={this.state.cardNumber}
        onChange={this.handleChange}
      />
    );
  }
}

export default CardNumberHolder;
