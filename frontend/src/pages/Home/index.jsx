import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/auth/actions";

import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((res) => {
  //     dispatch(authAction(res.data.bpi.USD.rate));
  //   });
  // }, []);

  const selector = useSelector;
  const authToken = selector((state) => state.auth.token);

  return (
    <div style={{ fontSize: "64px" }}>
      {authToken}
      <div>
        <button
          onClick={() =>
            axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((res) => {
              dispatch(authAction(res.data.bpi.USD.rate));
            })
          }
        >
          login
        </button>
      </div>
    </div>
  );
};

export default Home;
