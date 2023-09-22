import { useQuery, useMutation, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const PURCHASE = gql`
  query purchase {
    purchase {
      id
      price
    }
  }
`;

const MUTATE_PURCHASE = gql`
  mutation purchase($promoCode: String) {
    purchase(promoCode: $promoCode) {
      id
      price
    }
  }
`;

export const AppPrice = () => {
  const [promoCode, setPromoCode] = useState();
  const { loading, data, error } = useQuery(PURCHASE, {
    // initialFetchPolicy: "no-cache",
    // nextFetchPolicy: "cache-first",
    fetchPolicy: "cache-and-network",
    // nextFetchPolicy: "cache-first",
  });
  const purchase = data?.purchase || [];

  console.log({ loading, data });

  const [applyPromoCode] = useMutation(MUTATE_PURCHASE, {});

  useEffect(() => {
    // if (promoCode) {
      applyPromoCode({ variables: { promoCode } });
    // }
  }, [applyPromoCode, promoCode]);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const handleChangePromoCode = (filter) => () => setPromoCode(filter);

  return (
    <>
      <div>AppPrice:</div>
      <div>{JSON.stringify({ promoCode }, null, 2)}</div>
      <div>
        <button onClick={handleChangePromoCode("PROMO_CODE")}>
          Add Promo Code
        </button>
        <button onClick={handleChangePromoCode(undefined)}>
          Remove Promo Code
        </button>
      </div>
      <div>Purchase:</div>
      <div>
        <div>{JSON.stringify(purchase, null, 2)}</div>
      </div>
    </>
  );
};
