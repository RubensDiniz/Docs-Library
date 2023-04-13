/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, ModelCategory, StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Disk } from '@/starlight'
import Link from 'next/link'

type DisksProps = {
  disks: StarlightListResponse<Entry<Disk>>
  categories: StarlightListResponse<ModelCategory>
}

const Disks = ({ disks, categories }: DisksProps) => {
  return (
    <>
      {disks.data.map((disk) => (
        <>
          <Link href={`/disk/${disk.slug}`}>
            <div>
              <img src={disk.data.cover_picture.files[1].path} alt={disk.slug} width="200px" />
            </div>

            <div>
              <h1>{disk.title}</h1>
            </div>

            <div>
              <span>Available? {disk.data.is_available ? 'Sim' : 'Não'}</span>
            </div>
          </Link>

          <br />
        </>
      ))}

      <div>
        {disks.meta.last_page > 1 && Array.from({ length: disks.meta.last_page }, (_, i) => i + 1).map((p) => (
          <Link key={p} href={`/disks/${p}`} style={{ margin: '0 20px', fontSize: '30px' }}>
            <span>
              {disks.meta.current_page === p ? (
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
        <Link key={c.id} href={`/disks/category/${c.title}`} style={{ margin: '0 20px', fontSize: '30px' }}>
          <span>{c.title}</span>
        </Link>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<DisksProps> = async ({ params }) => {
  const disks = await Starlight.disks.entries.list({ page: params?.page ? parseInt(params.page as string) : 1, limit: 10 })
  const categories = await Starlight.disks.categories.list()
  return { props: { disks, categories } }
}

export default Disks