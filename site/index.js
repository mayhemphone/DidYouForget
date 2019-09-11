const express = require('express');

// App instance //
const app = express();

// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));

// Helper function: This allows our server to parse the incoming token from the client
// This is being run as middleware, so it has access to the incoming request
function fromRequest(req){

	if (!req.body.headers){

	}

  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}


//////////////////////////////////////////////////////////////




app.use('/search', require('./controllers/search'));

// This is the catch-all route. Ideally you don't get here unless you made a mistake on your front-end
app.get('*', function(req, res, next) {
	res.status(404).send({ message: 'Not Found' });
});

// Listen on specified PORT or default to 3000
app.listen(process.env.PORT || 3000);

