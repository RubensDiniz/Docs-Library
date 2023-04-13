/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Newspaper } from '@/starlight'
import Link from 'next/link'

type NewspaperProps = {
  newspapers: StarlightListResponse<Entry<Newspaper>>
  categories: StarlightListResponse<ModelCategory>
}

const Newspapers = ({ newspapers, categories }: NewspaperProps) => {
  return (
    <>
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
          <span>{c.title}</span>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<NewspaperProps> = async ({ params }) => {
  const newspapers = await Starlight.newspapers.entries.list({ page: params?.page ? parseInt(params.page as string) : 1, limit: 10 })
  const categories = await Starlight.newspapers.categories.list()
  return { props: { newspapers, categories } }
}

export default Newspapers