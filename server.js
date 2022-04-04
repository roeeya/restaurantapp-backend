const express = require('express');
require('./config/db');
const port = process.env.PORT;
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
const adminRoute = require('./src/routes/admin.routes');
const blogRoute = require('./src/routes/blog.routes');
const menuRoute = require('./src/routes/menu.routes');

app.use('/admin', adminRoute);
app.use('/blog', blogRoute);
app.use('/getblogimage', express.static('./assets/blog_files'));
app.use('/menu', menuRoute);
app.use('/getmenuimage', express.static('./assets/menu_files'));




app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});