import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

export const PACKAGES = gql`
  query packages($sectionName: String!, $currency: String!) {
    packages(sectionName: $sectionName, currency: $currency) {
      id
      curriculum {
        section {
          name
        }
      }
      price {
        forHuman
        currency
      }
    }
  }
`;

function App() {
  const [sectionName, setSectionName] = useState("english");
  const [currency, setCurrency] = useState("USD");
  console.log("query");
  const { loading, error, data } = useQuery(PACKAGES, {
    variables: { sectionName, currency },
  });
  console.log("called");

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const handleLangClick = (sectionName) => () => setSectionName(sectionName);
  const handleCurrencyClick = (currency) => () => setCurrency(currency);

  return (
    <>
      <div>Packages:</div>
      <div>
        {data.packages.map((p) => (
          <div>{JSON.stringify(p, null, 2)}</div>
        ))}
      </div>
      <div>
        <button onClick={handleLangClick("english")}>English</button>
        <button onClick={handleLangClick("german")}>German</button>
      </div>
      <div>
        <button onClick={handleCurrencyClick("USD")}>USD</button>
        <button onClick={handleCurrencyClick("EUR")}>EUR</button>
      </div>
    </>
  );
}

export default App;
