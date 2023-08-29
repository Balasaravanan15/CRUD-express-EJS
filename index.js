const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
uuid();

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {   
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {   
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {   
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {   
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
app.get('/', (req, res) => {
    res.render('comments/home');
})

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
}) 

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => { 
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })

})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundcomment = comments.find(c => c.id == id);
    foundcomment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
})

/*

username
text

bob - hello!

GET /allomments
GET /all
GET /showallcommentsnow

POST /newomment
POST /makeomment

*/

/*

GET /comments - list all omments
POST /comments - Create a neẇ omment
GET /comments/:id - Get one Comment (using ID)
PATCH /comments/:id - Update one comment
DELETE /comment/:id - Destroy one comment

*/
/*
app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})
*/