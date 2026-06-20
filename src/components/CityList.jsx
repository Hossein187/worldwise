import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';

import { useCities } from '../context/CitiesContext';

import styles from './CityList.module.css';

function CityList() {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"now We're on updating data, Please ComeBack Later."} />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
