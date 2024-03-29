import React from "react";
import ReactDOM from "react-dom/client";
// import { AppClass } from "./AppClass";
// import { AppPrice } from "./AppPrice";
// import { AppGoal } from "./AppGoal";
import { AppNotifications } from "./AppNotifications";
import { Packages } from "./Packages";
// import { ApolloProvider, ApolloClient } from "@apollo/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          classes: {
            keyArgs: ["filter"],
            merge(existing = [], incoming) {
              console.log("merging");
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Package: {
  //       keyFields: ["id", "curriculum", ["section"], "price", ["currency"]],
  //     },
  //   },
  // }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Packages />
    {/* <AppClass /> */}
    {/* <AppPrice /> */}
    {/* <AppGoal /> */}
    <AppNotifications />
  </ApolloProvider>
);
