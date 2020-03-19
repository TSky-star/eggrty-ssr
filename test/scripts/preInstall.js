#!/usr/bin/env node

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const execWithPromise = promisify(exec)

const install = (path, shell, afterHooks) => {
  fs.stat(path, async err => {
    if (err) {
      const { stdout } = await execWithPromise(shell)
      console.log(stdout)
    }
    if (afterHooks) {
      const { stdout } = await execWithPromise(afterHooks)
      console.log(stdout)
    }
  })
}

const preInstall = async () => {
  install('./packages/eggrty-utils/node_modules', 'cd ./packages/eggrty-utils && npm i')
  install('./packages/eggrty-cli/node_modules', 'cd ./packages/eggrty-cli && npm i')
  install('./demo/ssr-with-js/node_modules', 'cd ./demo/ssr-with-js && npm i && npm run build')
}

preInstall().catch(err => {
  console.log('err', err)
  process.exit()
})
