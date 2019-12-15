import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './setCards.module.css';
import Card from './components/card';

class SetCardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount = () => {
    try {
      const cards = require(`data/cards${this.props.location.pathname}.json`);
      if(cards) this.setState({ cards });
    } catch (e) {
      this.props.history.goBack();
    }
  }

  render = () => {
    const { cards } = this.state;

    return (
      <section className={styles.page}>
        {cards.map((card, i) => <Card key={i} card={card} />)}
      </section>
    );
  }
}

export default withRouter(SetCardsPage);
