import { useLocation } from "react-router-dom";
import UserDetails from './userDetails';

function PersonalInfo() {
  const location = useLocation();
  const user = location.state?.user;
  const filterProperties = (key) => {
    return !["salt", "password_digest"].includes(key);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h5 style={{ textAlign: "center" }}>
        {user
          ? `${user.fname} ${user.mname ? user.mname + " " : ""}${user.lname}`
          : "Loading..."}
      </h5>
      <h3>Personal Information</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {user &&
          Object.entries(user)
            .filter(([key]) => filterProperties(key))
            .map(([key, value], index) => (
              <div
                key={key}
                style={{
                  marginBottom: "10px",
                  gridColumn: index % 2 === 0 ? "1" : "2",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{key}:</span>
               {value !== "" ? value : "null"}
      
              </div>
            ))}
      </div>
      <UserDetails userId={user.id} />
    </div>
  );
}

export default PersonalInfo;
