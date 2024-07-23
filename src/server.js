import app from '../src/app/index.js';
import '../src/database/index.js'; // Adicione esta linha para garantir que o banco de dados é inicializado

const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0', function () {
  console.log(`Server is running at port ${port}...🚀`);
});
