// Description:
//   Adds Slack hubot commands for starting the deployment chain
//   by pushing one branch to another

const { execSync } = require("child_process")

module.exports = (robot) => {
  // Command: ping!
  robot.respond(/ping!/, (res) => {
    if (res.message.room !== "54e9664d15522ed4b3dc4eb3") {
      return
    }
    res.send("pong!")
  })
  // Command: deploy
  robot.respond(/deploy$/, (res) => {
    if (res.message.room !== "54e9664d15522ed4b3dc4eb3") {
      return
    }
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
