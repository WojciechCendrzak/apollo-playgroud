import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const PURCHASE_QUERY = gql`
  query purchase($promoCode: String) {
    purchase(promoCode: $promoCode) {
      id
      price
    }
  }
`;

// const PURCHASE_QUERY_2 = gql`
// query purchase($promoCode: String) {
//   purchase(promoCode: $promoCode) {
//     id
//     price
//   }
// }
// `;

const MUTATE_PURCHASE = gql`
  mutation purchase($promoCode: String) {
    purchase(promoCode: $promoCode) {
      id
      price
    }
  }
`;

export const AppPrice = () => {
  // const [promoCode, setPromoCode] = useState();
  // const {
  //   loading,
  //   data: data1,
  //   error,
  // } = useQuery(PURCHASE_QUERY, {
  //   // variables: {
  //   //   promoCode: "1",
  //   // },
  //   initialFetchPolicy: "no-cache",
  //   // nextFetchPolicy: "cache-first",
  //   // fetchPolicy: "cache-and-network",
  //   // fetchPolicy: "network-only",
  //   // nextFetchPolicy: "cache-first",
  //   // skip: true,
  // });

  const [fetchPurchase1, { loading: loading1, data: data1 }] = useLazyQuery(
    PURCHASE_QUERY,
    {
      // fetchPolicy: "cache-and-network",
      // fetchPolicy: "network-only",
      // initialFetchPolicy: "no-cache",
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    fetchPurchase1();
  }, [fetchPurchase1]);
  // const [applyPromoCode] = useMutation(MUTATE_PURCHASE, {});

  const [fetchPurchase2, { loading: loading2, data: data2 }] = useLazyQuery(
    PURCHASE_QUERY,
    {
      // fetchPolicy: "cache-and-network",
      // fetchPolicy: "network-only",
      fetchPolicy: "no-cache",
      // initialFetchPolicy: "no-cache",
    }
  );

  const purchase1 = data1?.purchase || [];
  const purchase2 = data2?.purchase || [];

  console.log({
    loading1,
    id: data1?.purchase?.id,
    loading2,
    id2: data2?.purchase?.id,
    price1: data1?.purchase?.price,
    price2: data2?.purchase?.price,
  });

  // useEffect(() => {
  //   // if (promoCode) {
  //   console.log("fetchPurchase");
  //   fetchPurchase({ variables: { promoCode } });
  //   // applyPromoCode({ variables: { promoCode } });
  //   // }
  // }, [fetchPurchase, promoCode]);

  if (loading1) {
    return <>Loading ...</>;
  }

  // if (error) {
  //   return <>Error: {error.message}</>;
  // }

  const handleChangePromoCode = (promoCode) => () => {
    // setPromoCode(filter);
    console.log("fetchPurchase", { promoCode });
    fetchPurchase2({ variables: { promoCode } });
  };

  const promoCode = data1?.purchase?.promoCode;

  return (
    <>
      <div>AppPrice:</div>
      <div>{JSON.stringify({ promoCode }, null, 2)}</div>
      <div>
        <button onClick={handleChangePromoCode("PROMO_CODE_1")}>
          Add Promo Code 1
        </button>
        <button onClick={handleChangePromoCode("PROMO_CODE_2")}>
          Add Promo Code 2
        </button>
        <button onClick={handleChangePromoCode(undefined)}>
          Remove Promo Code
        </button>
      </div>
      <div>Purchase 1:</div>
      <div>
        <div>{JSON.stringify(purchase1, null, 2)}</div>
      </div>
      <div>Purchase 2:</div>
      <div>
        <div>{JSON.stringify(purchase2, null, 2)}</div>
      </div>
    </>
  );
};
