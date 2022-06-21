import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion, editQuestion, beforQuestion } from '../../redux/actions/questions.action'
import { toast } from 'react-toastify'

// import { UsersTable } from './list'
import { Row, Col, Input, Button } from 'reactstrap'

const Questions = () => {

  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions)
  const [question, setQuestion] = useState('')
  const [questionId, setQuestionId] = useState('')
  
  useEffect(() => {
     dispatch(beforQuestion())
     dispatch(getQuestion())
  }, [questions.updatedQuestion])  

  useEffect(() => {
    if (questions.questionAuth) {
      setQuestion(questions.questionValue[0].question)
      setQuestionId(questions.questionValue[0].id)
    }
  }, [questions.questionAuth])

  const handleSubmit = () => {
      if (question === "") { 
        toast.error("Question can not be empty", { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      } else {
        dispatch(editQuestion(questionId, {question}))
      }
  }
  return (
    <>
      <div id='Home-analytics'>
       <Row className='match-height'>
         <h3 className='ml-1' style={{ fontWeight: 600 }}>Survey sheet Question</h3>
       </Row>
       <Row className='match-height'>
         <Col xs='12'>
         <Input
            id="exampleText"
            name="text"
            type="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
           {/* <UsersTable /> */}
         </Col>
         <Button.Ripple  className="mt-1 ml-1" color='primary' onClick={() => handleSubmit()}> Update </Button.Ripple>
       </Row>
      </div>
    </>  
  )
}
export default Questions
