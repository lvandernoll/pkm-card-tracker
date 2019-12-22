import React, { Component } from 'react';
import styles from './setCards.module.scss';
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
      const cards = require(`data/${this.props.location.pathname.split('/set/').join('')}.json`);
      if(cards) this.setState({ cards: cards.cards });
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

export default SetCardsPage;
