const resolvers = {
  Query: {
    classes: (_, { page, filter }) => {
      return [
        getClass("1", page, filter),
        getClass("2", page, filter),
        getClass("3", page, filter),
      ];
    },

    goal: () => {
      return {
        id: "G_1",
        value: goalDefault,
      };
    },

    packages: (_, { sectionName, currency }, { dataSources }) => {
      console.log({ sectionName, currency });

      if (sectionName === "english") {
        return [
          {
            id: "P_1",
            curriculumId: "C_1",
            priceId: "P_1",
            currency,
          },
        ];
      }
      if (sectionName === "german") {
        return [
          {
            id: "P_1",
            curriculumId: "C_2",
            priceId: "P_2",
            currency,
          },
        ];
      }
    },

    purchase: (_, { promoCode }, { dataSources }) => ({
      id: getPurchaseId(),
      price: getPrice(promoCode),
      description: "price description",
    }),

    notifications: (_, __, { dataSources }) => {
      console.log("notifications");

      return [
        {
          id: "N_1",
          type: "CHALLENGE_STARTED",
          // payload: {
            // challengeName: "challenge 1",
          // },
        },
        {
          id: "N_2",
          type: "CHALLENGE_PRIZE_ACHIEVED",
          // payload: {
            // challengeName: "challenge 2",
          //   price: {
          //     name: "price 1",
          //     value: 15,
          //   },
          // },
        },
      ];
    },
  },
  Mutation: {
    purchase: (_, { promoCode }, { dataSources }) => {
      return {
        id: getPurchaseId(),
        price: getPrice(promoCode),
        description: "price description",
      };
    },

    setGoal: (_, { value }) => {
      goalDefault = value;

      return {
        id: "G_1",
        value: goalDefault,
      };
    },
  },
  Package: {
    curriculum: ({ curriculumId }, __, { dataSources }) => {
      if (curriculumId === "C_1") {
        return {
          id: curriculumId,
          sectionId: "S_1",
        };
      }
      if (curriculumId === "C_2") {
        return {
          id: curriculumId,
          sectionId: "S_2",
        };
      }
    },
    price: ({ priceId, currency }, __, { dataSources }) => {
      if (priceId === "P_1") {
        return {
          id: priceId,
          forHuman: currency === "USD" ? "$59" : "€49",
          currency,
        };
      }
      if (priceId === "P_2") {
        return {
          id: priceId,
          forHuman: currency === "USD" ? "$79" : "€69",
          currency,
        };
      }
    },
  },
  Curriculum: {
    section: ({ sectionId }, __, { dataSources }) => {
      return {
        id: sectionId,
        name: sectionId === "S_1" ? "english" : "german",
      };
    },
  },
  // NotificationPayload: {
  //   __resolveType: (obj, contextValue, info) => {
  //     console.log("NotificationPayload", { obj, contextValue, info });
  //     if (obj.type === "CHALLENGE_STARTED") {
  //       return "ChallengeStarted";
  //     }
  //     // Only Book has a title field
  //     if (obj.type === "CHALLENGE_PRIZE_ACHIEVED") {
  //       return "ChallengePrizeAchieved";
  //     }
  //     return null; // GraphQLError is thrown
  //   },
  // },
  ChallengeStarted: {
    // challengeName: () => {
    //   console.log("ChallengeStarted challengeName");

    //   return "february-2024";
    // },
    challengeName: () => "february-2024",
    // title: () => "title 1",
    __isTypeOf: (obj) => {
      console.log("__isTypeOf ChallengeStarted", obj);

      return obj.type === "CHALLENGE_STARTED";
    }
  },
  ChallengePrizeAchieved: {
    challengeName: () => "february-2024",
    // value: () => 15,
    // prize: () => ({
    //   name: "prize 1",
    //   value: 15,
    // }),
    __isTypeOf: (obj) => {
      console.log("__isTypeOf ChallengePrizeAchieved", obj);

      return obj.type === "CHALLENGE_PRIZE_ACHIEVED";
    }
  },
};

const getClass = (id, page, filter) => ({
  id: `${page * 100}_${id}_${filter}`,
  page,
  name: `class ${id}`,
  filter,
});

let goalDefault = 0;

let PRICE = 100;

let uid = 0;
const getPurchaseId = () => {
  uid++;

  return `ID_${uid}`;
};

const getPrice = (promoCode) => {
  let discount = 0;

  switch (promoCode) {
    case "PROMO_CODE_1":
      discount = 1;
      break;
    case "PROMO_CODE_2":
      discount = 2;
      break;
    default:
      discount = 0;
      break;
  }

  return PRICE + discount;
};

module.exports = resolvers;
