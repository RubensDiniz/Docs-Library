/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Publication } from '@/starlight'
import Link from 'next/link'

type PublicationsProps = {
  publications: StarlightListResponse<Entry<Publication>>
  categories: StarlightListResponse<ModelCategory>
  currentCategory: string
}

const PublicationCategory = ({ publications, categories, currentCategory }: PublicationsProps) => {
  return (
    <>
      <h1>{currentCategory}</h1>

      <br />
      <hr />
      <br />

      {publications.data.map((publication) => (
        <>
          <Link href={`/publication/${publication.slug}`}>
            <div>
              <h1>{publication.title}</h1>
            </div>

            <div>
              <span>Ano {publication.data.year}</span>
            </div>
          </Link>

          <br />
        </>
      ))}

      <div>
        {publications.meta.last_page > 1 && Array.from({ length: publications.meta.last_page }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`/publications/${p}`} style={{ margin: '0 20px', fontSize: '30px' }}>
            <span>
              {publications.meta.current_page === p ? (
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
        <Link key={c.id} href={`/publications/category/${c.title}`} style={{ margin: '0 20px', fontSize: '30px' }}>
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

export const getServerSideProps: GetServerSideProps<PublicationsProps> = async ({ params }) => {
  const publications = await Starlight.publications.category(params?.category as string).entries()
  const categories = await Starlight.publications.categories.list()
  const currentCategory = params?.category as string
  return { props: { publications, categories, currentCategory } }
}

export default PublicationCategory