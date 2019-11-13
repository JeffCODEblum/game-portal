const express = require('express');
const exphbs  = require('express-handlebars');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const testData = require('./testData.js');
const Moment = require ('moment');

mongoose.connect('mongodb://localhost/game-portal', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ItemSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    timestamp: String, 
    body: String, 
    directory: String, 
    width: String, 
    height: String, 
    audioTags: [{id: String, path: String}], 
    scripts: [String],
    views: Number
});
const ItemModel = new mongoose.model('ItemModel', ItemSchema);

const CommentSchema = new mongoose.Schema({email: String, name: String, comment: String, timestamp: String, hidden: Boolean, postId: String});
const CommentModel = new mongoose.model('CommentModel', CommentSchema);

app.use(express.static('public'))
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const APP_URL = 'http://localhost:4000';

const data = testData;
function authenticate(req, res, callback) {
    if (!req.headers.authorization) {
        res.redirect(APP_URL + '/login');
    }
    else {
        var token = req.headers.authorization;
        try {
            var decoded = jwt.verify(token, 'private-key');
            if (decoded) {
                callback();
            }
            else {
                res.sendStatus(403);
            }
        }
        catch(err) {
            console.log(err);
            res.sendStatus(403);
        }
    }
    return;
}

// dummy data load
// app.get('/prime-db', (req, res) => {
//     for (let i = 0; i < data.items.length; i++) {
//         const model = new ItemModel({
//             title: data.items[i].title,
//             description: data.items[i].description,
//             directory: data.items[i].directory,
//             timestamp: '' + Date.now() - i * 1000 * 60 * 60 * 24 * 31,
//             body: data.items[i].body,
//             width: data.items[i].width,
//             height: data.items[i].height,
//             audioTags: data.items[i].audioTags,
//             scripts: data.items[i].scripts
//         });
//         model.save();
//     }
//     res.send(true);
//     return;
// });
async function PrimeDb() {
    await ItemModel.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        if (docs.length === 0) {
                for (let i = 0; i < data.items.length; i++) {
                const model = new ItemModel({
                    title: data.items[i].title,
                    description: data.items[i].description,
                    directory: data.items[i].directory,
                    timestamp: '' + Date.now() - i * 1000 * 60 * 60 * 24 * 31,
                    body: data.items[i].body,
                    width: data.items[i].width,
                    height: data.items[i].height,
                    audioTags: data.items[i].audioTags,
                    scripts: data.items[i].scripts
                });
                model.save();
            }
        }
    });
}
PrimeDb();

 
// home page
app.get('/', (req, res) => {
   res.redirect('/from/0');
});

app.get('/from/:from', (req, res) => {
    let from = parseInt(req.params.from);
    if (!from) from = 0;
    let prev = from - 10;
    if (prev < 0) prev = 0;
    let to = from + 10;
    ItemModel.find({},{}, {skip: from, limit: 10}).sort('-timestamp').exec((err, docs) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            const items = docs.map(item => {return { 
                id: item.id, 
                title: item.title, 
                description: item.description, 
                directory: item.directory, 
                timestamp: Moment(parseInt(item.timestamp)).format("MMMM Do YYYY"),
                body: item.body,
                url: APP_URL
            }});
            const context = {
                items: items,
                showPrev: from > 0,
                prev: prev,
                from: from,
                to: to,
                url: APP_URL
            };
            res.render('home', context);
        }
    });
    return;
});

// detail page
app.get('/detail/:id', (req, res) => {
    ItemModel.findOneAndUpdate({_id: req.params.id}, {$inc: {views: 1}}, (err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (doc) {
            CommentModel.find({postId: req.params.id, hidden: false}, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                if (docs) {
                    const comments = docs.map(doc => {
                        return {
                            email: doc.email, 
                            name: doc.name, 
                            comment: doc.comment, 
                            timestamp: Moment(parseInt(doc.timestamp)).format('MMMM Do YYYY'),
                        }
                    });
                    const context = { 
                        id: doc.id, 
                        title: doc.title, 
                        description: doc.description, 
                        url: APP_URL, 
                        directory: doc.directory,
                        timestamp: doc.timestamp,
                        comments: comments,
                        body: doc.body,
                        width: doc.width,
                        height: doc.height,
                        audioTags: doc.audioTags,
                        scripts: doc.scripts,
                        views: doc.views
                    };
                    res.render('detail', context);
                }
            });
        }
    });
    return;
});

// login page
app.get('/login', (req, res) => {
    res.render('login', {url: APP_URL});
    return;
});

// login submit
app.post('/login-submit', (req, res) => {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        var token = jwt.sign({ foo: 'bar'}, 'private-key');
        res.send({
            jwt: token
        });
    }
    else {
        res.status(401);
    }
    return;
});

// main admin page
app.get('/admin', (req, res) => {
    authenticate(req, res, () => {
        var context = {url: APP_URL};
        ItemModel.find({}, (err, docs) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            if (docs) {
                context.items =  docs.map(item => {return { 
                    id: item.id, 
                    title: item.title, 
                    directory: item.directory,
                    views: item.views,
                    timestamp: Moment(parseInt(item.timestamp)).format('MMMM Do YYYY')
                }});
                context.editItem = false;
                res.render('admin', context);
            }
            return;
        });
        return;
    });         
    return;
});

// admin detail page
app.get('/admin-new', (req, res) => {
    authenticate(req, res, () => {
        const context = {url: APP_URL};
        res.render('admin-new', context);
    });
    return;
});

// admin detail page
app.get('/admin/:id', (req, res) => {
    authenticate(req, res, () => {
        const id = req.params.id;
        ItemModel.findOne({_id: id}, (err, doc) => {
            if (err) {
                console.log(err);
            }
            if (doc) {
                CommentModel.find({postId: id}, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                    if (doc) {
                        const comments = docs.map(doc => {
                            return {
                                id: doc._id,
                                name: doc.name,
                                email: doc.email,
                                comment: doc.comment,
                                hidden: doc.hidden,
                                timestamp: Moment(parseInt(doc.timestamp)).format('MMMM Do YYYY')
                            } 
                        });
                        const context = {url: APP_URL, editItem: doc, comments: comments};
                        res.render('admin-edit', context);
                    }
                    return;
                });
            }
            return;
        });
        return;
    });
    return;
});

app.post('/post-comment/:id', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const timestamp = Date.now() + '';
    const id = req.params.id;

    if (! (name && email && comment && id)) {
        res.sendStatus(403);
        return;
    }

    const commentModel = new CommentModel({
        name: name,
        email: email,
        comment: comment,
        hidden: true,
        timestamp: timestamp,
        postId: id
    });

    commentModel.save((err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (doc) {
            res.send(true);
        }
        return;
    });
    return;
});

app.post('/hide-comment/:id', (req, res) => {
    console.log("hit hide comment");
    authenticate(req, res, () => {
        const id = req.params.id;
        CommentModel.findOneAndUpdate({_id: id}, {hidden: true}, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(500);
            }
            if (doc) {
                res.send(true);
            }
            return;
        });
        return;
    });
    return;
});

app.post('/show-comment/:id', (req, res) => {
    console.log("hit show comment");
    authenticate(req, res, () => {
        const id = req.params.id;
        CommentModel.findOneAndUpdate({_id: id}, {hidden: false}, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(500);
            }
            if (doc) {
                res.send(true);
            }
            return;
        });
        return;
    });
    return;
});

app.delete('/delete-comment/:id', (req, res) => {
    console.log("delete fired");
    authenticate(req, res, () => {
        const id = req.params.id;
        CommentModel.deleteOne({_id: id}, (err, doc) => {
            if (err) {
                console.log(err);
                res.send(500);
            }
            if (doc) {
                res.send(true);
            }
            return;
        });
        return;
    });
    return;
});

app.post('/save-post', (req, res) => {
    authenticate(req, res, () => {
        const title = req.body.title;
        const description = req.body.description;
        const body = req.body.body;
        const directory = req.body.directory;
        const model = new ItemModel({
            title: title, 
            description: description, 
            directory: directory,
            timestamp: '' + Date.now(),
            body: body
        });
        console.log(model);
        model.save((err, doc) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            if (doc) {
                console.log("saved");
                res.send(true);
            }
            return;
        });
        return;
    });  
    return;
});

// save item
app.post('/save-post/:id', (req, res) => {
    authenticate(req, res, () => {
        const title = req.body.title;
        const description = req.body.description;
        const body = req.body.body;
        const directory = req.body.directory;
        const id = req.params.id;
        if (id) {
            ItemModel.findOneAndUpdate({_id: id}, {title: title, description: description, body: body, directory: directory}, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                if (doc) {
                    res.send(true);
                }
                return;
            });
        }
        return;
    });    
    return;
});

// delete item
app.delete('/delete-post/:id', (req, res) => {
    authenticate(req, res, () => {
        const id = req.params.id;
        ItemModel.deleteOne({_id: id}, (err, doc) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            if (doc) {
                res.send(true);
            }
            return;
        });
        return;
    });      
    return;
});

app.listen(4000);
