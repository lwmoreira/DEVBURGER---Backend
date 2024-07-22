import app from '../src/app/index.js'

const port = process.env.PORT || 3001

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at port ${port}...🚀`)
})
