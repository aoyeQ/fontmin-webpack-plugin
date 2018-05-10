
var path = require('path')
var fs = require('fs')
const Fontmin = require('fontmin')

const number = '0123456789' // [0-9]
const en = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM' // [A-Za-z]
const punctuation = ',，.。!！+'

/**
 * @param {
 * filepath|fontpath|targetpath: regex|string,
 * en: boolean,
 * number: boolean,
 * regex: regex
 * } options
 */
class FontMinByFont {
  constructor (options) {
    this.options = Object.assign({
      filepath: path.resolve(__dirname, '../src'),
      fontpath: '',
      targetpath: '',
      text: '',
      number: true,
      en: true,
      regex: /[\u4e00-\u9fa5]/gm
    }, options)
    if (this.options.number) {
      this.options.text = number
    }
    if (this.options.en) {
      this.options.text += en
    }
    this.options.text += (options.punctuation || punctuation)
  }
  apply (compiler) {
    compiler.plugin('compile', params => {
      const files = this.filterFile()
      // console.log(files, ':filterFile')
      this.options.text += this.getFont(files)
      // console.log(this.options.text, this.options, 'end')
      this.fontmin()
    })
  }
  geAllPath (readPath) { // get all file path from dir
    let allFilePath = []
    function getFilePath (pathUrl) {
      const filesArr = fs.readdirSync(pathUrl)
      filesArr.forEach(v => {
        const curFilePath = path.join(pathUrl, v)
        const stat = fs.lstatSync(curFilePath)
        if (stat.isDirectory()) getFilePath(curFilePath)
        else allFilePath.push(curFilePath)
      })
    }
    getFilePath(readPath)
    return allFilePath
  }
  filterFile () { // exclude file
    if (!this.options.exclude) return
    let allFile = this.geAllPath(this.options.filepath)
    allFile = allFile.filter(v => this.options.exclude.indexOf(v) < 0)
    if (!this.options.include) return
    allFile = allFile.concat(this.options.include)
    return allFile
  }
  getFont (arr) { // read all file from dir
    const regex = this.options.regex
    if (!regex) return
    const font = arr.map(v => {
      const file = fs.readFileSync(v, 'utf-8')
      let oneFile = file.match(regex)
      if (oneFile && Array.isArray(oneFile)) return oneFile.filter(v => !v.includes('/') && !v.includes('微软雅黑'))
    })
    const fontArr = font.join('').split(',')
    const fontStr = fontArr.join('')
    let fonts = []
    for (let i = 0; i < fontStr.length; i++) {
      fonts.push(fontStr.charAt(i))
    }
    console.log([...new Set(fonts)].join(''))
    return [...new Set(fonts)].join('')
  }
  fontmin ({ fontpath, text, targetpath } = this.options) { // run font min
    const fontmin = new Fontmin()
      .src(fontpath)          // 输入配置
      .use(Fontmin.glyph({   // 字形提取插件
        text // 所需文件
      }))
      .use(Fontmin.ttf2eot()) // eot转换插件
      .use(Fontmin.ttf2woff()) // woff
      .use(Fontmin.ttf2svg()) // svg
      .use(Fontmin.css())    // css生成插件
      .dest(targetpath) // 输出配置

    fontmin.run(function (err, files, steam) {
      if (err) {
        console.log(err)
      }
      console.log('done fontmin success!')
    })
  }
}

module.exports = FontMinByFont
