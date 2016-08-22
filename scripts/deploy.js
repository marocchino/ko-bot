// Description:
//   Adds Slack hubot commands for starting the deployment chain
//   by pushing one branch to another

const { execSync } = require("child_process")

module.exports = (robot) => {
  // Command: deploy
  robot.respond(/deploy$/, (res) => {
    const commands = [
      "rm -rf nodejs-ko",
      "git clone --depth 1 --branch master https://github.com/nodejs/nodejs-ko.git nodejs-ko",
      "cd nodejs-ko",
      "npm install",
      "npm run deploy"
    ]
    const ret = execSync(commands.join(" && "))
    robot.logger.info(ret)
    res.send("Deploy complete! <https://nodejs.github.io/nodejs-ko/>")
  })
}
