import React from "react";
import Posts from "./Posts";
import UserPanel from "./UserPanel";

function Dashboard() {
  return (
    <div className="flex flex-row">
      <UserPanel />
      <Posts />
    </div>
  );
}

export default Dashboard;
