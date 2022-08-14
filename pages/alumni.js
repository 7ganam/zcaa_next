import { useEffect, useState } from "react";
import ExperienceFieldsSection from "components/alumni-sections/ExperienceFieldsSection/ExperienceFieldsSection";
import UniversitiesSection from "components/alumni-sections/UniversitiesSection/UniversitiesSection";

import dynamic from "next/dynamic";

const Map_section = dynamic(
  () => import("components/shared/Map_section/Map_section"),
  {
    ssr: false,
  }
);
function Alumni() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const FetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
        );
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers.data);
      } catch (error) {
        let err = error;
      }
    };

    FetchUsers();
  }, []);

  return (
    <div>
      <Map_section users={users} />
      <ExperienceFieldsSection users={users} />
      <UniversitiesSection users={users} />
    </div>
  );
}

export default Alumni;
