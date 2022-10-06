import axios from "../../api/axios";
import { useEffect, useState } from "react";

const DmList = (props) => {
  const { userList } = props;

  return (
    <div>
     {userList.length > 0 ? userList.map(user => <div key={user.id}>{user.user}</div>) : <div>no users</div>}
    </div>
  );
};

export default DmList;
