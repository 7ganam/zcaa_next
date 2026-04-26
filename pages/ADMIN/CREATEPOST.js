import { useEffect, useState } from "react";

function CREATEPOST() {
  const [AdminComponent, setAdminComponent] = useState(null);

  useEffect(() => {
    import("components/admin/AdminComponent").then((module) => {
      setAdminComponent(() => module.default);
    });
  }, []);

  if (!AdminComponent) {
    return null;
  }

  return (
    <div>
      <AdminComponent />
    </div>
  );
}

export default CREATEPOST;
