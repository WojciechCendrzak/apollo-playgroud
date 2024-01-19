import { useQuery, gql, useMutation } from "@apollo/client";

export const GOAL = gql`
  query goal {
    goal {
      id
      value
    }
  }
`;

export const SET_GOAL = gql`
  mutation setGoal($value: Int!) {
    setGoal(value: $value) {
      id
      value
    }
  }
`;

export const AppGoal = () => {
  const { data, loading, error } = useQuery(GOAL, {
    fetchPolicy: "cache-first",
  });
  const goal = data?.goal || {};

  console.log({ loading, data });

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <GoalSelect />

      <div>Goals:</div>
      <div>{JSON.stringify({ goal }, null, 2)}</div>
    </>
  );
};

const GoalSelect = () => {
  const [setGoal] = useMutation(SET_GOAL);

  const handleSetGoal = (value) => {
    setGoal({ variables: { value } });
  };

  return (
    <div>
      <button onClick={() => handleSetGoal(1)}>set goal to 1</button>
      <button onClick={() => handleSetGoal(2)}>set goal to 2</button>
      <button onClick={() => handleSetGoal(3)}>set goal to 3</button>
    </div>
  );
};
