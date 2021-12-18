import { useState, useEffect } from "react";
import "./App.css";
import { useDrizzleContext } from "./drizzle/drizzleContext";
import { connect } from "react-redux";

function App({ dataCall, account }) {
  const drizzle = useDrizzleContext();

  const [data, setData] = useState("");
  const [cacheKey, setCacheKey] = useState(null);

  useEffect(() => {
    // call the simpleStorage contract data method
    const cacheKey =
      drizzle.contracts.MyStringStore.methods.myString.cacheCall();
    setCacheKey(cacheKey);
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("this be account", account);
    drizzle.contracts.MyStringStore.methods
      .set(data)
      .send({ from: account, gas: 90000 })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (event) => {
    setData(event.target.value);
  };
  return (
    <div>
      <h1>Data in contract storage:</h1>
      {dataCall[cacheKey] && dataCall[cacheKey].value && (
        <p>{dataCall[cacheKey].value}</p>
      )}
      <form onSubmit={onSubmit}>
        <input value={data} onChange={onChange} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataCall: state.contracts.MyStringStore.myString,
    account: state.accounts[0],
  };
};

export default connect(mapStateToProps)(App);
