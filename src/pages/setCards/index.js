import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Card from './components/card';
import form from 'styles/form.module.scss';
import styles from './setCards.module.scss';

class SetCardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cards: [],
      filteredCards: [],
      set: 0,
      search: '',
      mobileSearchActive: false,
      showMobileSearch: false,
    };
  }

  componentDidMount = async () => {
    document.addEventListener('scroll', this.updateMobileSearch);
    this.updateMobileSearch();

    const setName = this.props.location.pathname.split('/set/').join('');
    let cards;

    this.setState({ isLoading: true });
    fetch(`${process.env.REACT_APP_API_URL}/set/${setName}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
    })
    .then(response => response.json().then(async (responseJson) => {
      if(response.status === 200) {
        try {
          cards = await require(`data/${responseJson.code || 'NULL'}-${responseJson.name}.json`);
          if(cards) cards = cards.cards;

          this.setState({ isLoading: false, set: responseJson.id });
          const newCards = [];
          responseJson.cards.forEach(card => {
            // eslint-disable-next-line
            const sameCard = cards.find(obj => obj.number == card.number);
            if(sameCard) newCards.push({...card, ...sameCard});
          });
          this.setState({ filteredCards: newCards, cards: newCards });
        } catch (e) {
          this.props.history.goBack();
        }
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

  updateMobileSearch = () => this.setState({ showMobileSearch: window.scrollY > 50 || window.innerWidth <= 640});

  onChangeSearch = e => {
    const search = e.currentTarget.value;
    if(search !== '') {
      const filteredCards = this.state.cards.filter(card => card.name.toLowerCase().includes(search.toLowerCase()) || card.number == search);
      this.setState({ filteredCards });
    }
    this.setState({ search });
  }

  openSearch = () => {
    if(!this.state.mobileSearchActive)  this.setState({ mobileSearchActive: true });
  }

  closeSearch = () => this.setState({ mobileSearchActive: false });

  render = () => {
    const { cards, filteredCards, set, mobileSearchActive, search, showMobileSearch } = this.state;
    const cardsView = search === '' ? cards : filteredCards;

    return (
      <section className={styles.page}>
        <div ref='headerSearch' className={styles.headerSearch}>
          <label className={`${form.inputWrapper} ${styles.headerSearchWrapper}`} htmlFor='headerSearch'>
            <input type='text' id='headerSearch' value={this.state.search} onChange={this.onChangeSearch} className={styles.headerSearchInput} />
            <FontAwesomeIcon className={styles.headerSearchIcon} icon={faSearch} />
          </label>
        </div>
        {cardsView.map((card) => <Card key={cards.findIndex(obj => obj === card)} card={card} set={set} />)}
        {showMobileSearch && <div onClick={this.openSearch} className={styles.mobileSearch}>
          <label className={`${form.inputWrapper} ${styles.mobileSearchWrapper}`} htmlFor='mobileSearch'>
            <input type='text' id='mobileSearch' value={this.state.search} onBlur={this.closeSearch} onChange={this.onChangeSearch} className={`${styles.mobileSearchInput} ${mobileSearchActive ? styles.mobileSearchInputActive : ''}`} />
            <FontAwesomeIcon className={`${styles.mobileSearchIcon} ${mobileSearchActive ? styles.mobileSearchIconActive : ''}`} icon={faSearch} />
          </label>
        </div>}
      </section>
    );
  }
}

export default withRouter(connect(state => ({ user: state.user }))(SetCardsPage));
