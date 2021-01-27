import  express, {Request, Response} from 'express';
import { blogRouter } from './blog/blogRouter';
import { userRouter } from './user/userRouter';

const createError = require('http-errors');
const cors = require('cors');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/blog', blogRouter);
app.use('/user', userRouter);

app.get('/', (req:Request, res:Response) => res.send("Hello, I am working"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

module.exports = app;