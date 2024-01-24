import { useQuery, gql } from "@apollo/client";

export const NOTIFICATIONS = gql`
  query notifications {
    notifications {
      __typename
      id
      type
      payload {
        ... on ChallengeStarted {
          challengeName
          title
        }
        ... on ChallengePrizeAchieved {
          challengeName
          value
          prize {
            name
            value
          }
        }
      }
    }
  }
`;

export const AppNotifications = () => {
  const { loading, error, data } = useQuery(NOTIFICATIONS);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <h1>Notifications</h1>
      <div>
        {data.notifications.map((p, index) => (
          <div key={index}>{JSON.stringify(p, null, 2)}</div>
        ))}
      </div>
    </>
  );
};
