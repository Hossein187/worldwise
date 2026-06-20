import CountriesItem from './CountriesItem';
import Message from './Message';
import Spinner from './Spinner';

import { useCities } from '../context/CitiesContext';
import styles from './CountriesList.module.css';

function CountriesList() {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"now We're on updating data, Please ComeBack Later."} />
    );
  const countries = [...new Map(cities.map((c) => [c.country, c])).values()];
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountriesItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
