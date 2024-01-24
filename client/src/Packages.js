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

export const Packages = () => {
  const [sectionName, setSectionName] = useState("english");
  const [currency, setCurrency] = useState("USD");
  console.log("query");
  const { loading, error, data } = useQuery(PACKAGES, {
    variables: { sectionName, currency },
  });
  // when using second time with different variables it will call the query again
  useQuery(PACKAGES, { variables: { sectionName: "german", currency } });
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
      <h1>Packages</h1>
      <div>
        {data.packages.map((p, index) => (
          <div key={index}>{JSON.stringify(p, null, 2)}</div>
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
};
