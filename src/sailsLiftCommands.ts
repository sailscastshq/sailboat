const enter = "\u000D";
const liftCommand = "sails lift";
export const sailsLiftCommands = [
  {
    command: "sailboat.liftSails",
    text: `${liftCommand}${enter}`,
  },
  {
    command: "sailboat.liftSailsVerbose",
    text: `${liftCommand} --verbose${enter}`,
  },
  {
    command: "sailboat.liftSailsSilly",
    text: `${liftCommand} --silly${enter}`,
  },
  {
    command: "sailboat.liftSailsSilent",
    text: `${liftCommand} --silent${enter}`,
  },
  {
    command: "sailboat.liftSailsInProduction",
    text: `${liftCommand} --prod${enter}`,
  },
  {
    command: "sailboat.liftSailsInStaging",
    text: `${liftCommand} --staging${enter}`,
  },
];
