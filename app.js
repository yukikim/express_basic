/**
*基本アプリファイルです
**/
const express = require('express')
const app = express()
//todo:POSTの為にbody-parserを追加
// "npm install body-parser --save"
const bodyParser = require('body-parser')

//todo:静的アセット設定
//publicディレクトリを静的ファイル格納ディレクトリに設定する
app.use('/', express.static(__dirname + '/public'))
//仮想パス"/kimura/"でアクセスしたときに静的ファイルとして提供するディレクトリを"/files"にする
app.use('/kimura', express.static(__dirname + '/files'))

// todo:POST用に追加
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//todo:テンプレートエンジンの設定
app.set('view engine', 'ejs')

//todo:CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})

//todo:ルーティング
app.get('/', (req, res) => {
    console.dir(req.query.name)
    let param = req.query.name
    res.send('Hello ' + param + ' さん!')
})

// app.use('/', require('./routes/index'))

app.post('/', (req, res) => {
    // todo:リクエストボディを出力
    console.log(req.body)
    // todo:パラメータ名、nameを出力
    console.log(req.body.name)
    // todo:コマンド
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"木村", "gender":"男"}' localhost:3000
    let postName = req.body.name
    let sex = req.body.gender
    res.send('Got a POST request! ' + postName + ' さんは' + sex + ' ですね。')
})

// app.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
// })
//
// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// })

const port = '3000'
app.listen(port, () => console.log('Express Server Start on port ' + port))
