/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, VisualContent } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Book } from '@/starlight'
import Link from 'next/link'

type BookProps = {
  book: Entry<Book>
}

const Book = ({ book }: BookProps) => {

  return (
    <>
      <div>
        <img src={book.data.cover_picture.files[1].path} alt={book.slug} />
      </div>

      <div>
        <h1>{book.title}</h1>
      </div>

      <div>
        <span>{book.data.isbn}</span>
      </div>

      <div>
        <span>Available? {book.data.is_available ? 'Sim' : 'Não'}</span>
      </div>

      <div>
        <VisualContent content={book.data.excerpt} />
      </div>

      <br />

      <div>
        <Link href="/books">Back to listing</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BookProps> = async ({ params, query }) => {
  const response = await Starlight.books.entries.get(params?.slug as string, {
    preview:
      typeof query.preview === 'string' ? query.preview : undefined,
  })
  return { props: { book: response.data } }
}

export default Book