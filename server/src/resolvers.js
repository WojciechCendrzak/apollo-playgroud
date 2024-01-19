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
