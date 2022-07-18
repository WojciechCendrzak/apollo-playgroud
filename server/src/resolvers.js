const resolvers = {
  Query: {
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

module.exports = resolvers;
