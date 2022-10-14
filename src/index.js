import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { quizReducer } from './store/reducers/quizReducer'
import { createQuizReducer } from './store/reducers/createQuizReducer'
import { authReducer } from './store/reducers/authReducer'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'

const container = document.getElementById('root')
const isSSR = container.hasChildNodes()

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

const app = (
  <Router>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Router>
)

isSSR ||
  (() => {
    console.log('SSR is not working')
    createRoot(container).render(app)
  })()
isSSR &&
  (() => {
    console.log('SSR is working')
    hydrateRoot(container, app)
  })()
