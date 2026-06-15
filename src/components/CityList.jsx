import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";

import styles from "./CityList.module.css";

function CityList({ isLoading, cities, deleteCity }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"now We're on updating data, Please ComeBack Later."} />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} deleteCity={deleteCity} />
      ))}
    </ul>
  );
}

export default CityList;
