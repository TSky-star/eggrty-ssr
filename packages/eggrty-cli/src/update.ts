import ora from 'ora'
import chalk from 'chalk'
import { execWithPromise, getWithPromise, resolveApp } from './util/index'
const url = 'https://registry.npm.taobao.org/eggrty-cli'
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
export async function updateCli (): Promise<void> {
  let localVersion
  try {
    localVersion = require(resolveApp('./package.json')).version.trim()
    const { 'dist-tags': { latest } } = await getWithPromise(url)
    // 成功拿到版本号 且 版本号与本地版本号不一致则执行更新
    if (latest !== localVersion) {
      const spinner = ora(`发现本地版本${chalk.bgRed('较旧')},尝试更新eggrty-cli脚手架`)
      spinner.start()
      const { stdout } = await execWithPromise(`npm i -g --registry=https://registry.npm.taobao.org eggrty-cli@${latest}`)
      console.log(chalk.yellowBright('                                     ') + chalk.bgGray('               ,d                  '))
      console.log(chalk.yellowBright('                                     ') + chalk.bgGray('               88                  '))
      console.log(chalk.yellowBright(' ,adPPYba,   ,adPPYb,d8   ,adPPYb,d8 ') + chalk.bgGray(' 8b,dPPYba,  MM88MMM  8b       d8  '))
      console.log(chalk.yellowBright('a8P_____88  a8"    `Y88  a8"    `Y88 ') + chalk.bgGray(' 88P\'   "Y8    88     `8b     d8\'  '))
      console.log(chalk.yellowBright('8PP"""""""  8b       88  8b       88 ') + chalk.bgGray(' 88            88      `8b   d8\'   '))
      console.log(chalk.yellowBright('"8b,   ,aa  "8a,   ,d88  "8a,   ,d88 ') + chalk.bgGray(' 88            88,      `8b,d8\'    '))
      console.log(chalk.yellowBright(' `"Ybbd8"\'   `"YbbdP"Y8   `"YbbdP"Y8 ') + chalk.bgGray(' 88            "Y888      Y88\'     '))
      console.log(chalk.yellowBright('             aa,    ,88   aa,    ,88  ') + chalk.bgGray('                         d8\'      '))
      console.log(chalk.yellowBright('              "Y8bbdP"     "Y8bbdP"  ') + chalk.bgGray('                         d8\'       '))
      console.log(stdout, `更新完毕... 请您重新执行 eggrty-cli init`)
      spinner.succeed()
      process.exit()
    }

  } catch (error) {
    console.log('\x1b[91m' + `获取最新版本失败本次创建将使用本地版本${localVersion}，若版本较旧请手动安装最新版本npm i -g eggrty-cli@latest或连接代理重试`)
  }
}
