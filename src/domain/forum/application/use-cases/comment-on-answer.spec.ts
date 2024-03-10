import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'

let answersRespository: InMemoryAnswersRepository
let answerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    answersRespository = new InMemoryAnswersRepository()
    answerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      answersRespository,
      answerCommentRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRespository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      content: 'comentario teste',
      authorId: answer.authorId.toString(),
    })

    expect(answerCommentRepository.items[0].content).toEqual('comentario teste')
  })
})
