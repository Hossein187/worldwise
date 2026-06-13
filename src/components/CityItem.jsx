import styles from "./CityItem.module.css";

function CityItem({ city }) {
  return <li>{city.cityName}</li>;
}

export default CityItem;
