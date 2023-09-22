const resolvers = {
  Query: {
    classes: (_, { page, filter }) => {
      return [
        getPage("1", page, filter),
        getPage("2", page, filter),
        getPage("3", page, filter),
      ];
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

    purchase: (_, __, { dataSources }) => ({
      id: "PRICE_1",
      price,
      description: "price description",
    }),
  },
  Mutation: {
    purchase: (_, { promoCode }, { dataSources }) => ({
      id: "PRICE_1",
      price: price + (promoCode ? 1 : 0),
      description: "price description",
    }),
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

const getPage = (id, page, filter) => ({
  id: `${page * 100}_${id}_${filter}`,
  page,
  name: `class ${id}`,
  filter,
});

let price = 100;

module.exports = resolvers;
