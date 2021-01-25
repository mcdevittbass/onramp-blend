import  express, {Request, Response} from 'express';

const cors = require('cors');
const bodyParser =  require('body-parser');
const db = require('./db_connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/', (req:Request, res:Response) => res.json({info: "Hello, I am working"}));
app.get('/blog', db.getBlog);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

module.exports = app;