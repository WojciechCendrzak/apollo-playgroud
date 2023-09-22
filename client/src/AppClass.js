import { useLazyQuery, useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

export const CLASSES = gql`
  query classes($page: Int!, $filter: String!) {
    classes(page: $page, filter: $filter) {
      id
      page
      name
      filter
    }
  }
`;

export const AppClass = () => {
  const [filter, setFilter] = useState("A");
  const [_, { loading, error, data, refetch, fetchMore }] = useLazyQuery(
    CLASSES,
    {
      variables: { page: 1, filter },
      // initialFetchPolicy: "no-cache",
      // nextFetchPolicy: "cache-first",
      fetchPolicy: "cache-and-network",
      // nextFetchPolicy: "cache-first",
    }
  );
  const classes = data?.classes || [];

  console.log({ loading, classes });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const handleFetchMore = () => {
    fetchMore({ variables: { page: getLastPage(classes) + 1 } });
  };

  const handleChangeFilter = (filter) => () => setFilter(filter);

  const handleRefetch = () => {
    refetch({ variables: { page: getLastPage(classes) } });
  };

  return (
    <>
      <div>Filters:</div>
      <div>
        {JSON.stringify({ filter, lastPage: getLastPage(classes) }, null, 2)}
      </div>
      <div>
        <button onClick={handleFetchMore}>fetch more</button>
      </div>
      <div>
        <button onClick={handleChangeFilter("A")}>filter by A</button>
        <button onClick={handleChangeFilter("B")}>filter by B</button>
      </div>
      <div>
        <button onClick={handleRefetch}>refetch</button>
      </div>
      <div>Classes:</div>
      <div>
        {classes.map((p, index) => (
          <div key={index}>{JSON.stringify(p, null, 2)}</div>
        ))}
      </div>
    </>
  );
};

export const AppClassQ = () => {
  const [filter, setFilter] = useState("A");
  const { loading, error, data, refetch, fetchMore } = useQuery(CLASSES, {
    variables: { page: 1, filter },
    // initialFetchPolicy: "no-cache",
    // nextFetchPolicy: "cache-first",
    // fetchPolicy: "no-cache",
    // nextFetchPolicy: "cache-first",
  });
  const classes = data?.classes;

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  const handleFetchMore = () => {
    fetchMore({ variables: { page: getLastPage(classes) + 1 } });
  };

  const handleChangeFilter = (filter) => () => setFilter(filter);

  const handleRefetch = () => {
    refetch({ variables: { page: getLastPage(classes) } });
  };

  return (
    <>
      <div>Filters:</div>
      <div>
        {JSON.stringify({ filter, lastPage: getLastPage(classes) }, null, 2)}
      </div>
      <div>
        <button onClick={handleFetchMore}>fetch more</button>
      </div>
      <div>
        <button onClick={handleChangeFilter("A")}>filter by A</button>
        <button onClick={handleChangeFilter("B")}>filter by B</button>
      </div>
      <div>
        <button onClick={handleRefetch}>refetch</button>
      </div>
      <div>Classes:</div>
      <div>
        {classes.map((p, index) => (
          <div key={index}>{JSON.stringify(p, null, 2)}</div>
        ))}
      </div>
      {/* <AppClass2 /> */}
    </>
  );
};

const getLastPage = (classes = []) =>
  (classes.length && classes[classes.length - 1].page) || 1;

export const AppClass2 = () => {
  const [filter, setFilter] = useState("A");
  const { data, refetch, fetchMore } = useQuery(CLASSES, {
    variables: { page: 1, filter },
  });
  const classes = data?.classes;

  const handleFetchMore = () => {
    fetchMore({ variables: { page: getLastPage(classes) + 1 } });
  };

  const handleChangeFilter = (filter) => () => setFilter(filter);

  const handleRefetch = () => {
    refetch({ variables: { page: getLastPage(classes) } });
  };

  return (
    <>
      <div>Filters2:</div>
      <div>
        {JSON.stringify({ filter, lastPage: getLastPage(classes) }, null, 2)}
      </div>
      <div>
        <button onClick={handleFetchMore}>fetch more</button>
      </div>
      <div>
        <button onClick={handleChangeFilter("A")}>filter by A</button>
        <button onClick={handleChangeFilter("B")}>filter by B</button>
      </div>
      <div>
        <button onClick={handleRefetch}>refetch</button>
      </div>
      <div>Classes2:</div>
      <div>
        {classes.map((p, index) => (
          <div key={index}>{JSON.stringify(p, null, 2)}</div>
        ))}
      </div>
    </>
  );
};
