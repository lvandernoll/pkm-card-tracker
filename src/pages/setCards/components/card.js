import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSpinner, faHandPaper, faHandPointLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
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
    fetch(`${process.env.REACT_APP_API_URL}/set/${this.props.set}/${this.state.card.number}/`, {
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
            this.setState({ count: this.state.count - 1 });
            break;
          default:
        }
        if(this.state.detailLoaded) {
          const newCard = this.state.card;
          const date = new Date().toISOString();
          newCard.actions = [...newCard.actions, ...[{name: this.props.user.data.name, action: actionName.toUpperCase(), timestamp: date}]];
          this.setState({ card: newCard });
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

  formatTime = stamp => {
    const date = new Date(stamp);
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    return `${day}-${month}-${date.getFullYear()}`;
  };

  formatActionIcon = action => {
    let icon;
    switch(action) {
      case 'ADD':
        icon = faPlus;
        break;
      case 'REMOVE':
        icon = faMinus;
        break;
      case 'LOAN':
        icon = faHandPaper;
        break;
      case 'RETURN':
        icon = faHandPointLeft;
        break;
      default:
        icon = faQuestion;
        break;
    }
    return <FontAwesomeIcon icon={icon} />
  }

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
              <FontAwesomeIcon className={`${styles.button} ${styles.buttonBig} ${styles.buttonBigRight}`} icon={faHandPointLeft} onClick={() => this.action('return')} />
            </div>
            <div className={styles.detailInfo}>
              <div>
                <span className={styles.detailName}>{card.name}#{card.number}</span>
                <div className={`${styles.detailAmount} ${detailLoaded && card.actions.length < 1 ? styles.noBorder : ''}`}>{this.state.count}</div>
                <span>{card.rarity}</span>
              </div>
              {(detailLoaded && card.actions.length > 0) && <div className={styles.actionWrapper}>
                <span className={styles.actionTitle}>Actions</span>
                <ul>
                  {card.actions.map((action, i) => <ul key={i} className={styles.actionItem}>
                    <li>{action.name}</li>
                    <li>{this.formatActionIcon(action.action)}</li>
                    <li>{this.formatTime(action.timestamp)}</li>
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
