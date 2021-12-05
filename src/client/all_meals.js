import React, { useState, useEffect, useCallback } from "react";

import ShowUser from "./showmeals";

const AllMeals = () => {
  const [name, setName] = useState("");

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  
  const [isEmpty, setEmpty] = useState(true);

  const apiBaseUrl = "http://localhost:3000/api/meals";

  const SearchUser = useCallback((value) => {
    setUsers([]);
    setEmpty(true);

    console.log("in search user");
    let apiUrl = "http://localhost:3000/api/meals";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        console.log(result);

        if (result) {
          const items = result
            .map((item) => item.title)
            // .filter((item) => item.startsWith(value));

          setUsers((prev) => {
            setIsLoading(false);
            setEmpty(false);

            return prev.concat(items);
          });

          console.log(users);
        }
      });
    console.log(users);
  }, []);

  useEffect(() => {
    SearchUser();
  }, [SearchUser]);

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log("name", name);
    SearchUser(e.target.value);
  };

  return (
    <div>
      {/* <input className="App" type="text" value={name} onChange={onChangeName} /> */}
      <br></br>
      <div style={{ display: isEmpty ? "inline-block" : "none" }}>
        No Result
      </div>

      <div style={{ display: isLoading ? "inline-block" : "none" }}>
        ...loading
      </div>

      {users.map((user) => {
        //console.log(user);
        return (
          <div>
            <ShowUser list={user} setUsers={setUsers} />
          </div>
        );
      })}
    </div>
  );
};

export default AllMeals;
