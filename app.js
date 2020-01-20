const express = require('express')
const app = express()

//todo:静的アセット設定
//publicディレクトリを静的ファイル格納ディレクトリに設定する
app.use('/', express.static(__dirname + '/public'))
//仮想パス"/kimura/"でアクセスしたときに静的ファイルとして提供するディレクトリを"/files"にする
app.use('/kimura', express.static(__dirname + '/files'))

//todo:テンプレートエンジンの設定
app.set('view engine', 'ejs')

//todo:CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})

//todo:ルーティング
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/', require('./routes/index'))

app.post('/', (req, res) => {
    res.send('Got a POST request!')
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

const port = '3000'
app.listen(port, () => console.log('Express Server Start on port ' + port))