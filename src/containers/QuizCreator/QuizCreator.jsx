import { connect } from 'react-redux'
import { Button as MuiButton, ButtonGroup } from '@mui/material'
import TouchInput from '../../components/UI/TouchInput/TouchInput'
import { NativeSelect as MuiSelect, Paper, TextField } from '@mui/material'
import { addQuestionToQuiz, createQuiz } from '../../store/actions/createQuizAction'
import AppendButton from '../../components/UI/AppendButton/AppendButton'
import { required } from '../../validation/ruleCreator'
import { createValidationInputField } from '../../helpers/formInputCreator'
import { useState } from 'react'
import PageContainer from '../../components/UI/styled/PageContainer/PageContainer'
import { useTheme } from '@emotion/react'
import { Add, Create } from '@mui/icons-material'
import { validate } from '../../validation/validate'
import { useEffect } from 'react'
import FileUploader from '../../components/FileUploader/FileUploader'

const initForm = () => [
  createValidationInputField('Введите вопрос', required()),
  createValidationInputField('Введите вариант ответа', required()),
  createValidationInputField('Введите вариант ответа', required()),
]

const QuizCreator = ({ quiz, addQuestionToQuiz, createQuiz }) => {
  const theme = useTheme()
  const [isFormValid, setFormValid] = useState(false)
  const [rightAnswerId, setRightAnswerId] = useState(1)
  const [formFields, setFormFields] = useState(initForm())
  const [touchInputValue, setTouchInputValue] = useState('Мой тест')
  const [file, setFile] = useState(null)

  const addQuestionHandler = () => {
    const [question, ...inputs] = [...formFields]
    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: inputs.map((input, index) => ({
        text: input.value,
        id: index + 1,
      })),
    }
    addQuestionToQuiz(questionItem)

    setRightAnswerId(1)
    setFormFields(initForm())
    setFormValid(false)
  }

  const createQuizHandler = (event) => {
    event.preventDefault()
    setRightAnswerId(1)
    setFormFields(initForm())
    setFormValid(false)
    setTouchInputValue('Мой тест')
    setFile(null)
    createQuiz(touchInputValue, file)
  }
  const onChangeHandler = (id, { target: { value } }) => {
    const formFieldsCopy = [...formFields]
    const field = formFieldsCopy[id]
    field.value = value
    field.touched = true
    field.isValid = validate(field.validationRules, value)
    formFieldsCopy[id] = field
    setFormFields(formFieldsCopy)
  }

  const selectChangeHandler = ({ target: { value } }) => {
    setRightAnswerId(+value)
  }
  const renderOpts = () => {
    return formFields.map((field, index) => (
      <TextField
        sx={{
          margin: `${theme.spacing(1)} 0`,
        }}
        key={`${field.label}-${index}`}
        onChange={onChangeHandler.bind(null, index)}
        value={field.value}
        color="primary"
        label={field.label}
        type="text"
        variant="outlined"
        fullWidth
        required
        error={field.touched && !field.isValid}
      />
    ))
  }
  const addOption = () => {
    const formFieldsCopy = [...formFields]
    formFieldsCopy.push(createValidationInputField('Введите вариант ответа', required()))
    setFormFields(formFieldsCopy)
    setFormValid(false)
  }

  useEffect(() => {
    const isFormValid = formFields.every((field) => field.isValid)
    setFormValid(isFormValid)
  }, [formFields])

  return (
    <PageContainer
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(3)} 0`,
      }}
    >
      <Paper
        sx={{
          padding: `${theme.spacing(3)}`,
          maxWidth: '800px',
          borderRadius: `${theme.spacing(2)}`,
        }}
        elevation={3}
      >
        <h1>
          <TouchInput
            touchInputValue={touchInputValue}
            touchInputonChangeHandler={(target, value) => {
              if (value.length > 50) {
                return
              }
              setTouchInputValue(value)
              target.style.height = 'inherit'
              target.style.height = target.scrollHeight + 'px'
            }}
          />
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {renderOpts()}
          {formFields.length < 5 && (
            <AppendButton onClick={addOption.bind(this)}>Добавить вариант ответа</AppendButton>
          )}
          <MuiSelect
            id="select"
            value={rightAnswerId}
            sx={{ width: '100%', marginBottom: '20px' }}
            onChange={selectChangeHandler}
          >
            {formFields
              .map((_, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))
              .splice(1)}
          </MuiSelect>

          <FileUploader file={file} onFile={(file) => setFile(file)} />

          <ButtonGroup variant="outlined">
            <MuiButton
              endIcon={<Add />}
              color="primary"
              variant="contained"
              onClick={addQuestionHandler}
              disabled={!isFormValid}
            >
              Добавить вопрос
            </MuiButton>
            <MuiButton
              endIcon={<Create />}
              color="primary"
              variant="contained"
              onClick={createQuizHandler.bind(this)}
              disabled={quiz.length === 0}
            >
              Создать тест
            </MuiButton>
          </ButtonGroup>
        </form>
      </Paper>
    </PageContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.createQuiz.quiz,
  }
}
const mapDispatchToProps = (dispatch) => ({
  addQuestionToQuiz: (question) => dispatch(addQuestionToQuiz(question)),
  createQuiz: (touchInputValue, logo) => dispatch(createQuiz(touchInputValue, logo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
