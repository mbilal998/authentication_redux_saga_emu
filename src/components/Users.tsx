import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const url = "http://localhost:5001/biding-auth-development/us-central1/api";

  const [count, setCount] = useState<number>(0);

  function getUser() {
    axios
      .get(url + "/getRandomNumber", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log(res);

        setCount(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUser();
  }, []);

  return <div>{count}</div>;
}
