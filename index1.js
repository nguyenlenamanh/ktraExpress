const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('usersList/db.json')
const db = low(adapter)

const app = express();

//cau 1
app.get('/:money',(req,res) => {
    var money = parseFloat(req.params.money);
    var rate = 23500;

    var outputMoney = money * rate;

    var obj = {
        soluong: money,
        tigia: rate,
        thanhtien: outputMoney
    };

    res.json(obj);
});

app.listen(3000);