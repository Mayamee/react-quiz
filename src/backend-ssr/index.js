import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as RouterSSR } from 'react-router-dom/server'
import path from 'path'
import fs from 'fs'
import App from '../App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'
import { quizReducer } from '../store/reducers/quizReducer'
import { createQuizReducer } from '../store/reducers/createQuizReducer'
import { authReducer } from '../store/reducers/authReducer'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'
import thunk from 'redux-thunk'

const PORT = process.env.PORT || 3000
const server = express()

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: [thunk],
})
const theme = createTheme({
  palette: {
    primary: {
      main: '#ECBC76',
    },
  },
})
server.use(/\/[^.]*$/, (req, res) => {
  console.info(
    `SSR render on '${req.baseUrl || '/'}' at ${new Date().toISOString()} from ${req.ip}`
  )
  fs.readFile(`${path.resolve(__dirname, '../client')}/index.html`, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err)
      return res.status(500).send('Oops, better luck next time!')
    }
    const rendered = renderToString(
      <RouterSSR location={req.baseUrl || '/'}>
        <StyledEngineProvider>
          <ThemeProvider theme={theme}>
            <ReduxProvider store={store}>
              <App />
            </ReduxProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </RouterSSR>
    )
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`))
  })
})

server.use(express.static(path.resolve(__dirname, '../client')))

server.listen(PORT, () => {
  console.log(`SSR server is working on port ${PORT}/tcp`)
})
