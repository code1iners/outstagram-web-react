module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "outstagram-backend",
      url: "http://121.130.224.131:4000/graphql",
    },
  },
};
