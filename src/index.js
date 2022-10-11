import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { quizReducer } from './store/reducers/quizReducer'
import { createQuizReducer } from './store/reducers/createQuizReducer'
import { authReducer } from './store/reducers/authReducer'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles'

const Store = configureStore({
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

const root = ReactDOM.createRoot(document.getElementById('root'))
const app = (
  <Provider store={Store}>
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  </Provider>
)
root.render(app)
