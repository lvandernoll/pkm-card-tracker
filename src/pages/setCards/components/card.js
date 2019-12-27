import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSpinner, faHandPaper, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.scss';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: this.props.card,
      count: this.props.card.total_cards,
      detail: false,
      detailedImgLoaded: false,
      detailLoaded: false,
    };
  }

  action = actionName => {
    fetch(`${process.env.REACT_APP_API_URL}/set/${this.props.set}/${this.state.card.id}/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
      body: JSON.stringify({ 'action': actionName }),
    })
    .then(response => {
      if(response.status === 204) {
        switch(actionName) {
          case 'add': 
            this.setState({ count: this.state.count + 1 });
            break;
          case 'remove':
          case 'loan':
            this.setState({ count: this.state.count - 1 });
            break;
          default:
        }
      }
      else response.json().then(responseJson => console.error(responseJson));
    })
    .catch(e => console.error(e));
  }

  addCard = () => {
    this.setState({ count: this.state.count + 1 });
  }

  removeCard = () => {
    if(this.state.count !== 0) this.setState({ count: this.state.count - 1 });
  }

  openDetail = () => {
    this.setState({ detail: !this.state.detail });
    fetch(`${process.env.REACT_APP_API_URL}/card/${this.state.card.id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
    })
    .then(response => response.json().then(responseJson => {
      if(response.status === 200) this.setState({ detailLoaded: true, card: {...this.state.card, ...responseJson} });
      else console.error(responseJson);
    }))
    .catch(e => console.error(e));
  }

  closeDetail = e => e.target === this.refs.popup && this.setState({ detail: !this.state.detail });

  onDetailLoad = () => this.setState({ detailedImgLoaded: true });

  render = () => {
    const { card, count, detailLoaded } = this.state;

    return (
      <>
        <article className={`${styles.card} ${count === 0 ? styles.grey : ''}`}>
          <img ref='img' className={styles.image} alt='' src={card.imageUrl} onClick={this.openDetail} />
          <div className={styles.count}>{count}</div>
          {count !== 0 && <FontAwesomeIcon className={`${styles.button} ${styles.buttonLeft}`} icon={faMinus} onClick={() => this.action('remove')} />}
          <FontAwesomeIcon className={`${styles.button} ${styles.buttonRight}`} icon={faPlus} onClick={() => this.action('add')} />
        </article>
        {this.state.detail &&
          <div ref='popup' className={styles.detailWrapper} onClick={this.closeDetail}>
            <div className={styles.detailImgWrapper}>
              {!this.state.detailedImgLoaded && <div className={styles.spinnerWrapper}><FontAwesomeIcon className={styles.spinner} icon={faSpinner} /></div>}
              <img className={`${styles.detailImg} ${this.state.detailedImgLoaded ? '' : styles.hidden}`} src={card.imageUrlHiRes} alt='detail' onLoad={this.onDetailLoad} />
              {count !== 0 && <FontAwesomeIcon className={`${styles.button} ${styles.buttonBig} ${styles.buttonBigLeft}`} icon={faHandPaper} onClick={() => this.action('loan')} />}
              <FontAwesomeIcon className={`${styles.button} ${styles.buttonBig} ${styles.buttonBigRight}`} icon={faHandPointLeft} onClick={() => this.action('hand-in')} />
            </div>
            <div className={styles.detailInfo}>
              <ul>
                <li>Name: {card.name}</li>
                <li>Number: {card.number}</li>
                <li>Amount: {card.total_cards}</li>
                {card.types && <li>Types: {card.types.join(', ')}</li>}
                <li>Supertype: {card.supertype}</li>
                <li>Rarity: {card.rarity}</li>
              </ul>
              {detailLoaded && <div className={styles.actionWrapper}>
                <span className={styles.actionTitle}>Actions</span>
                <ul>
                  {card.actions.map((action, i) => <ul key={i} className={styles.actionItem}>
                    <li>Name: {action.name}</li>
                    <li>Action: {action.action}</li>
                    <li>Timestamp: {action.timestamp}</li>
                  </ul>)}
                </ul>
              </div>}
            </div>
          </div>
        }
      </>
    );
  }
};

export default connect(state => ({ user: state.user }))(Card);
