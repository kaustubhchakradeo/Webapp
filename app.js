const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');

const path = require('path');

const User = require('./models/users');
const Todo = require('./models/todo');

app = express();
session = require('express-session');

 app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


var server = require('http').createServer(app);
var port = 3001;
var hostname='localhost'


server.listen(process.env.PORT ,hostname, () => {
	console.log("Listening at post: "+port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

/*View Engine middle-ware*/
//1. Setting up the type of view engine to ejs(embedded js)
app.set('view engine', 'ejs');
//2. set the path for views.
app.set('views', path.join(__dirname,'views'));

app.get('/', (req, res)=> {
res.redirect('/login');
});

app.get('/login', (req,res)=> {
	res.render('Login.ejs');
});

app.get('/register', (req,res)=>{
	res.render('Signup.ejs');
});

app.get('/todo', (req,res)=> {
			console.log(req.session)
	if(req.session.user!=undefined && req.session.user.username!=null) {
		res.render('todo.ejs');
	} else {
		res.redirect('login');
	}
});

app.post('/register', (req,res) => {
	var uname = req.body.uname;
	var psw = req.body.psw;
	User().findOne({where: {username:uname, password:psw}}).then(user=>{
	if(user){
			res.redirect('/register');
			console.log('Username $(user.uname)	');
	}
	else{
		User().create({username:uname, password:psw}).then(user=>{
		console.log('Username $(user.uname), Password $(user.psw)');
		res.redirect('/login');	
		});
	}
	});
	
});
	
	

app.post('/login', (req,res)=> {
	//console.log(req.body)
	var uname = req.body.uname;
	var psw = req.body.psw;	
	User().findOne({where: {username:uname, password:psw}}).then(user=> {
		if(user) {
			req.session.user = user;
			req.session.user.email=uname

			res.redirect('/todo');
		} else {
			console.log('Not logged in')
				res.render('Login.ejs')
		}
	});
});


app.post('/todo', (req,res)=>{
	var myInput = req.body.myInput;
	
	User().findOne({where: {item:myInput}}).then(user=> {
		res.redirect('/todo');
	});
});
app.get('/', (req, res)=>{
	/*Todo().findAll().then(todos => {
	  console.log("All todos:", JSON.stringify(todos, null, 4));
	});*/
	res.redirect('/login');
});

app.get('/register', (req, res)=>{
	/*Todo().findAll().then(todos => {
	  console.log("All todos:", JSON.stringify(todos, null, 4));
	});*/
	res.render('Signup.ejs');
});

app.post('/addItem', (req, res)=> {
	var todo=req.body.text;
	var imp=req.body.imp;
	var uname = req.session.user.username;
	console.log(todo+' '+imp)
	
		Todo().create({item: todo, priority: imp,  username:uname}).then(user=>{
			var htmll = ''; 	
			Todo().findAll({where:{username:uname}}).then(todos=> {
				todos.forEach((todo)=> {
					if(todo.dataValues.priority==1) {
						cls = 'high'
					} else if(todo.dataValues.priority==2) {
						cls='medium'
					} else {
						cls='low'
					}
						htmll+='<li class='+cls+' id='+todo.dataValues.no+'>'+todo.dataValues.item+'</li>'	
				});
				res.send(htmll);
			});
		});
	
});

app.post('/loadItems', (req, res)=> {
	var uname = req.session.user.username;
	var htmll = ''; 	
	Todo().findAll({where:{username:uname}}).then(todos=> {
		todos.forEach((todo)=> {
			if(todo.dataValues.priority==1) {
				cls = 'high'
			} else if(todo.dataValues.priority==2) {
				cls='medium'
			} else {
				cls='low'
			}
				htmll+='<li class='+cls+' id='+todo.dataValues.no+'>'+todo.dataValues.item+'</li>'	
		});
		res.send(htmll);
	});
});

app.post('/delItem', (req, res)=> {
	console.log(req.body.id);
	Todo().destroy({where: {no: req.body.id}}).then(()=> {
		res.send();
	});

});

app.get('/logout', (req, res)=> {
	req.session.user=undefined;
	res.redirect('/login')
});
