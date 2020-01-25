import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import sets from 'data/sets.json';
import styles from './setList.module.scss';

class SetListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      sets: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`${process.env.REACT_APP_API_URL}/set/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${this.props.user.data.token}`,
      },
    })
    .then(response => response.json().then(responseJson => {
      if(response.status === 200) {
        this.setState({ isLoading: false });
        const newSets = [];
        responseJson.forEach(set => {
          const sameSet = sets.find(obj => obj.name === set.name);
          const index = sets.findIndex(obj => obj === sameSet);
          if(sameSet) newSets[index] = {...set, ...sameSet};
        });
        this.setState({ sets: newSets });
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

  render = () =>
    <section className={styles.page}>
      {this.state.sets.map((set, i) =>
        <Link key={i} to={`/set/${set.name}`}>
          <article className={styles.set}>
            <img className={styles.image} alt='' src={set.logoUrl} />
            <span className={styles.name}>{set.name}</span>
            <span className={styles.percentage}>{Math.round(set.owned_cards / set.totalCards * 10000) / 100}%</span>
            <span className={styles.amount}>{set.owned_cards_sr}/{set.totalCards}</span>
            <img className={styles.symbol} alt='' src={set.symbolUrl} />
          </article>
        </Link>
      )}
    </section>;
}

export default connect(state => ({ user: state.user }))(SetListPage);
