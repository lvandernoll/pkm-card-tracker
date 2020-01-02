import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './components/card';
import styles from './setCards.module.scss';

class SetCardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cards: [],
      set: 0,
    };
  }

  componentDidMount = async () => {
    let cards;
    try {
      cards = await require(`data/${this.props.location.pathname.split('/set/').join('')}.json`);
      if(cards) cards = cards.cards;
    } catch (e) {
      this.props.history.goBack();
    }

    this.setState({ isLoading: true });
    fetch(`${process.env.REACT_APP_API_URL}/set/1`, { // CHANGE THIS ID TO A NAME EVENTUALLY
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
    })
    .then(response => response.json().then(responseJson => {
      if(response.status === 200) {
        this.setState({ isLoading: false, set: responseJson.id });
        const newCards = [];
        responseJson.cards.forEach(card => {
          // eslint-disable-next-line
          const sameCard = cards.find(obj => obj.number == card.number);
          if(sameCard) newCards.push({...card, ...sameCard});
        });
        this.setState({ cards: newCards });
      }
      else {
        console.error(responseJson);
        this.setState({ isLoading: false });
      }
    }))
    .catch(e => {
      console.error(e);
      this.setState({ isLoading: false });
    });
  }

  render = () => {
    const { cards, set } = this.state;

    return (
      <section className={styles.page}>
        {cards.map((card, i) => <Card key={i} card={card} set={set} />)}
      </section>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user }))(SetCardsPage));
