import Spinner from "./Spinner";
import Message from "./Message";
import CountriesItem from "./CountriesItem";

import styles from "./CountriesList.module.css";

function CountriesList({ isLoading, cities }) {
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
