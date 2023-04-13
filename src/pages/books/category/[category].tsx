/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Book } from '@/starlight'
import Link from 'next/link'

type BooksProps = {
  books: StarlightListResponse<Entry<Book>>
  categories: StarlightListResponse<ModelCategory>
  currentCategory: string
}

const BookCategory = ({ books, categories, currentCategory }: BooksProps) => {
  return (
    <>
      <h1>{currentCategory}</h1>

      <br />
      <hr />
      <br />

      {books.data.map((book) => (
        <>
          <Link href={`/book/${book.slug}`}>
            <div>
              <img src={book.data.cover_picture.files[1].path} alt={book.slug} width="200px" />
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
          </Link>

          <br />
        </>
      ))}


      <div>
        {books.meta.last_page > 1 && Array.from({ length: books.meta.last_page }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`/books/${p}`} style={{ margin: '0 20px', fontSize: '30px' }}>
            <span>
              {books.meta.current_page === p ? (
                <b>{p}</b>
              ) : (p)}
            </span>
          </Link>
        ))}
      </div>

      <br />
      <hr />
      <br />

      {categories.data.map((c) => (
        <Link key={c.id} href={`/books/category/${c.title}`} style={{ margin: '0 20px', fontSize: '30px' }}>
          <span>
            {currentCategory === c.title ? (
              <b>{c.title}</b>
            ) : (c.title)}
          </span>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BooksProps> = async ({ params }) => {
  const books = await Starlight.books.category(params?.category as string).entries()
  const categories = await Starlight.books.categories.list()
  const currentCategory = params?.category as string
  return { props: { books, categories, currentCategory } }
}

export default BookCategory