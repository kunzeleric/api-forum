import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(questionCommentRepository)
  })

  it('should be able to delete comment on question', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(questionCommentRepository.items).toHaveLength(0)
  })

  it('should be not able to delete anoter user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-01'),
    })

    await questionCommentRepository.create(questionComment)

    expect(() => {
      return sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-02',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
