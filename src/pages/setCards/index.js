import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      const cards = require(`data/cards/${this.props.location.pathname.split('/set/').join('')}.json`);
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

export default connect( state => ({ authData: state.user.data }))(SetCardsPage);
