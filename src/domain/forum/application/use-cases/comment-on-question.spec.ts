import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let questionsRespository: InMemoryQuestionsRepository
let questionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question Use Case', () => {
  beforeEach(() => {
    questionsRespository = new InMemoryQuestionsRepository()
    questionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRespository,
      questionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionsRespository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      content: 'comentario teste',
      authorId: question.authorId.toString(),
    })

    expect(questionCommentRepository.items[0].content).toEqual(
      'comentario teste',
    )
  })
})
