import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.card = props.card;

    this.state = {
      count: 0,
    };
  }

  addCard = () => {
    this.setState({ count: this.state.count + 1 });
  }

  removeCard = () => {
    if(this.state.count !== 0) this.setState({ count: this.state.count - 1 });
  }

  render = () => {
    const card = this.card;
    const { count }= this.state;

    return (
      <article className={`${styles.card} ${count === 0 ? styles.grey : ''}`}>
        <img className={styles.image} alt='' src={card.imageUrl} />
        <div className={styles.count}>{count}</div>
        <FontAwesomeIcon className={`${styles.button} ${styles.buttonLeft}`} icon={faMinus} onClick={this.removeCard} />
        <FontAwesomeIcon className={`${styles.button} ${styles.buttonRight}`} icon={faPlus} onClick={this.addCard} />
      </article>
    );
  }
};

export default Card;
