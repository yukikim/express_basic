/**
*基本アプリファイルです
**/
const express = require('express')
const app = express()
//todo:POSTの為にbody-parserを追加
// "npm install body-parser --save"
const bodyParser = require('body-parser')
//todo:非同期リクエストモジュール
const request = require('superagent')

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

//todo:非同期でAPIデータ取得
const callApi = (apiUrl, page = '1') => {
    return new Promise((resolve, reject) => {
        //todo:superagentの出番
        request
            .get(apiUrl)
            .query({cd_ps: '1', bai: '0', YMD_biz: '', page: page})
            .end((err, res) => {
                if(err) {
                    return reject(err)
                }
                resolve(res.body.Ki)
            })
    })
}

//todo:Promise呼出で取得する
// callApi('http://www.pscube.jp/dedamajyoho-P-townDMMpachi/c739201/cgi-bin/nc-m03-001.php')
//     .then((result) => {
//         console.log('取得データは')
//         console.dir(result)
//     })
//     .catch((error) => {
//         console.log('エラー発生')
//         console.dir(error)
//     })

//todo:ルーティング
app.get('/', (req, res) => {
    console.dir(req.query.page)
    let param = req.query.page

//todo:async/await呼出関数で取得する
    getApi = async (pageNum) => {
        const getData = await callApi('http://www.pscube.jp/dedamajyoho-P-townDMMpachi/c739201/cgi-bin/nc-m03-001.php', pageNum)
        // console.log('async/awaitで取得')
        // console.dir(getData)

        //todo:取得した配列をmapで再配列を作成する
        let getArr = []
        getData.map((item, key) => {
            getArr[key] = {
                machine: item.nmk_kisyu
            }
        })
        // console.dir(JSON.stringify(getArr))
        //todo:JSONで返す
        res.send(JSON.stringify(getArr))
    }
    getApi(param)
})

//todo:ejsテンプレート使用
app.get('/test', (req, res) => {
    
    res.render('test', { //todo: 'test' >> /views/test.ejs
        message: 'Hello'
    })
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
