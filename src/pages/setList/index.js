import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sets from 'data/sets.json';
import styles from './setList.module.scss';

const SetListPage = ({ authData }) =>
  <section className={styles.page}>
    {sets.map((set, i) =>
      <Link key={i} to={`/set/${set.name}`}>
        <article className={styles.set}>
          <img className={styles.image} alt='' src={set.logoUrl} />
          <span className={styles.name}>{set.name}</span>
          <span className={styles.percentage}>100%</span>
          <span className={styles.amount}>200/200</span>
        </article>
      </Link>
    )}
  </section>;

export default connect( state => ({ authData: state.user.data }))(SetListPage);

