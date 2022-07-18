const { RESTDataSource } = require("apollo-datasource-rest");

class PackageAPI extends RESTDataSource {
  constructor() {
    super();
    // the Catstronauts catalog is hosted on this server
    // this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  // getPackages() {
  //   return [
  //     {
  //       id: "P_1",
  //       curriculumId: "C_1",
  //       // curriculum: Curriculum!
  //       // price: Price!
  //     },
  //     {
  //       id: "P_2",
  //       curriculumId: "C_2",

  //       // curriculum: Curriculum!
  //       // price: Price!
  //     },
  //   ];
  // }

  // getCurriculum(curriculumId) {
  //   return {
  //     id: curriculumId,
  //   };
  // }

  // getAuthor(authorId) {
  //   return this.get(`author/${authorId}`);
  // }

  // getTrack(trackId) {
  //   return this.get(`track/${trackId}`);
  // }

  // getTrackModules(trackId) {
  //   return this.get(`track/${trackId}/modules`);
  // }

  // getModule(moduleId) {
  //   return this.get(`module/${moduleId}`);
  // }

  // incrementTrackViews(trackId) {
  //   return this.patch(`track/${trackId}/numberOfViews`);
  // }
}

module.exports = PackageAPI;
