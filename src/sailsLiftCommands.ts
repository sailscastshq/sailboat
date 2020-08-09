const enter = "\u000D";
const liftCommand = "sails lift"
export const sailsLiftCommands = [
    {
        command: 'sailboat.liftSails',
        text: `${liftCommand}${enter}`
    },
    {
        command: 'sailboat.liftSailsVerbose',
        text: `${liftCommand} --verbose${enter}`
    },
    {
        command: 'sailboat.liftSailsSilly',
        text: `${liftCommand} --silly${enter}`
    }
]