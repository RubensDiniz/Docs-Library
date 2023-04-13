import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Publication } from '@/starlight'
import Link from 'next/link'

type PublicationProps = {
  publications: StarlightListResponse<Entry<Publication>>
  categories: StarlightListResponse<ModelCategory>
}

const Publications = ({ publications, categories }: PublicationProps) => {
  return (
    <>
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
          <span>{c.title}</span>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PublicationProps> = async ({ params }) => {
  const publications = await Starlight.publications.entries.list({ page: params?.page ? parseInt(params.page as string) : 1, limit: 10 })
  const categories = await Starlight.publications.categories.list()
  return { props: { publications, categories } }
}

export default Publications