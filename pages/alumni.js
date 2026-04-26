import ExperienceFieldsSection from "components/alumni-sections/ExperienceFieldsSection/ExperienceFieldsSection";
import UniversitiesSection from "components/alumni-sections/UniversitiesSection/UniversitiesSection";
import dynamic from "next/dynamic";
import { Container } from "reactstrap";
import styles from "components/alumni-sections/AlumniPage.module.css";

const Map_section = dynamic(
  () => import("components/shared/Map_section/Map_section"),
  {
    ssr: false,
  }
);
function Alumni({ users }) {
  return (
    <main className={styles.alumni_page}>
      <Container className={styles.alumni_hero}>
        <div>
          <div className={styles.eyebrow}>Alumni Network</div>
          <h1>Discover Zewail City alumni across the world.</h1>
          <p>
            Explore where alumni live, what fields they work in, and the
            universities they have visited through the ZCAA network.
          </p>
        </div>
        <div className={styles.hero_badge}>
          <span>{users?.length || 0}</span>
          <small>registered alumni</small>
        </div>
      </Container>

      <section className={styles.map_section}>
        <Map_section users={users} />
      </section>
      <ExperienceFieldsSection users={users} />
      <UniversitiesSection users={users} />
    </main>
  );
}

export default Alumni;
