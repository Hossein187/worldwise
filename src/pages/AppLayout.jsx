import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <section className={styles.app}>
      <Sidebar />
      <Map />
    </section>
  );
}

export default AppLayout;
