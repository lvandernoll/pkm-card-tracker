import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.scss';

class Card extends Component {
  constructor(props) {
    super(props);

    this.card = props.card;

    this.state = {
      count: 0,
      detail: false,
      detailLoaded: false,
    };
  }

  addCard = () => {
    this.setState({ count: this.state.count + 1 });
  }

  removeCard = () => {
    if(this.state.count !== 0) this.setState({ count: this.state.count - 1 });
  }

  toggleDetail = () => this.setState({ detail: !this.state.detail });

  onDetailLoad = () => this.setState({ detailLoaded: true });

  render = () => {
    const card = this.card;
    const { count }= this.state;

    return (
      <>
        <article className={`${styles.card} ${count === 0 ? styles.grey : ''}`}>
          <img className={styles.image} alt='' src={card.imageUrl} onClick={this.toggleDetail} />
          <div className={styles.count}>{count}</div>
          {count !== 0 && <FontAwesomeIcon className={`${styles.button} ${styles.buttonLeft}`} icon={faMinus} onClick={this.removeCard} />}
          <FontAwesomeIcon className={`${styles.button} ${styles.buttonRight}`} icon={faPlus} onClick={this.addCard} />
        </article>
        {this.state.detail && 
          <div className={styles.detailWrapper} onClick={this.toggleDetail}>
            {!this.state.detailLoaded && <div className={styles.spinnerWrapper}><FontAwesomeIcon className={styles.spinner} icon={faSpinner} /></div>}
            <img className={`${styles.detailImg} ${this.state.detailLoaded ? '' : styles.hidden}`} src={card.imageUrlHiRes} alt='detail' onLoad={this.onDetailLoad} />
            <div className={styles.detailInfo}>
              <span>info</span>
              <span>info</span>
            </div>
          </div>
        }
      </>
    );
  }
};

export default Card;
