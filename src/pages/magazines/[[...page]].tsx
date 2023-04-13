/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Magazine } from '@/starlight'
import Link from 'next/link'

type MagazinesProps = {
  magazines: StarlightListResponse<Entry<Magazine>>
  categories: StarlightListResponse<ModelCategory>
}

const Magazines = ({ magazines, categories }: MagazinesProps) => {
  return (
    <>
      {magazines.data.map((magazine) => (
        <>
          <Link href={`/magazine/${magazine.slug}`}>
            <div>
              <img src={magazine.data.cover_picture.files[1].path} alt={magazine.slug} width="200px" />
            </div>

            <div>
              <h1>{magazine.title}</h1>
            </div>

            <div>
              <span>Edição {magazine.data.issue_number}</span>
            </div>

            <div>
              <span>Available? {magazine.data.is_available ? 'Sim' : 'Não'}</span>
            </div>
          </Link>

          <br />
        </>
      ))}

      <div>
        {magazines.meta.last_page > 1 && Array.from({ length: magazines.meta.last_page }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`/magazines/${p}`} style={{ margin: '0 20px', fontSize: '30px' }}>
            <span>
              {magazines.meta.current_page === p ? (
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
        <Link key={c.id} href={`/magazines/category/${c.title}`} style={{ margin: '0 20px', fontSize: '30px' }}>
          <span>{c.title}</span>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<MagazinesProps> = async ({ params }) => {
  const magazines = await Starlight.magazines.entries.list({ page: params?.page ? parseInt(params.page as string) : 1, limit: 10 })
  const categories = await Starlight.magazines.categories.list()
  return { props: { magazines, categories } }
}

export default Magazines