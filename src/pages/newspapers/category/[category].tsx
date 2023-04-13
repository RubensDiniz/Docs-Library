/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Newspaper } from '@/starlight'
import Link from 'next/link'

type NewspapersProps = {
  newspapers: StarlightListResponse<Entry<Newspaper>>
  categories: StarlightListResponse<ModelCategory>
  currentCategory: string
}

const NewspaperCategory = ({ newspapers, categories, currentCategory }: NewspapersProps) => {
  return (
    <>
      <h1>{currentCategory}</h1>

      <br />
      <hr />
      <br />

      {newspapers.data.map((newspaper) => (
        <>
          <Link href={`/newspaper/${newspaper.slug}`}>
            <div>
              <img src={newspaper.data.logo.files[1].path} alt={newspaper.slug} width="200px" style={{ backgroundColor: 'white' }} />
            </div>

            <div>
              <h1>{newspaper.title}</h1>
            </div>
          </Link>

          <br />
        </>
      ))}

      <div>
        {newspapers.meta.last_page > 1 && Array.from({ length: newspapers.meta.last_page }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`/newspapers/${p}`} style={{ margin: '0 20px', fontSize: '30px' }}>
            <span>
              {newspapers.meta.current_page === p ? (
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
        <Link key={c.id} href={`/newspapers/category/${c.title}`} style={{ margin: '0 20px', fontSize: '30px' }}>
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

export const getServerSideProps: GetServerSideProps<NewspapersProps> = async ({ params }) => {
  const newspapers = await Starlight.newspapers.category(params?.category as string).entries()
  const categories = await Starlight.newspapers.categories.list()
  const currentCategory = params?.category as string
  return { props: { newspapers, categories, currentCategory } }
}

export default NewspaperCategory