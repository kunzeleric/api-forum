import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('Answer a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
