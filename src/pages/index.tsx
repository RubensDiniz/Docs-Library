/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, Singleton, StarlightItemResponse, StarlightListResponse } from '@starlightcms/next-sdk'
import { Home } from '@/starlight'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

type HomeProps = {
  singleton: StarlightItemResponse<Singleton<Home>>
  recentItems: StarlightListResponse<Entry<Record<string, unknown>>>
  monthItems: StarlightListResponse<Entry<any>>
}

const Home = ({ singleton, recentItems, monthItems }: HomeProps) => {
  return (
    <>
      <div>
        <img src={singleton.data.data.logo.files[1].path} alt={singleton.data.slug} width="350px" />
      </div>

      <div>
        <h1>{singleton.data.data.slogan}</h1>
      </div>

      <br />

      <Link href={`/books`}>
        <h3>Books</h3>
      </Link>

      <br />

      <Link href={`/disks`}>
        <h3>Disks</h3>
      </Link>

      <br />

      <Link href={`/magazines`}>
        <h3>Magazines</h3>
      </Link>

      <br />

      <Link href={`/newspapers`}>
        <h3>Newspapers</h3>
      </Link>

      <br />

      <Link href={`/publications`}>
        <h3>Publications</h3>
      </Link>

      <br />

      <Link href={`/media`}>
        <h3>Media</h3>
      </Link>

      <br />

      <Link href={`/suggest`}>
        <h3>Suggest</h3>
      </Link>

      <br />

      <Link href={`/search`}>
        <h3>Search</h3>
      </Link>

      <br />
      <hr />
      <br />

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ width: '50%' }}>
          <h2>Recent items</h2>

          <br />

          {recentItems.data.map((item) => (
            <>
              <Link href={`/${item.model?.title.slice(0, -1).toLowerCase()}/${item.slug}`}>
                <div>
                  <h3>{item.title}</h3>
                </div>

                <div>
                  <span>Type: {item.model?.title}</span>
                </div>
              </Link>

              <br />
            </>
          ))}
        </div>

        <div style={{ width: '50%' }}>
          <h2>Items of the month</h2>

          <br />

          {monthItems.data.map((item) => (
            <>
              <Link href={`/${item.model?.title.slice(0, -1).toLowerCase()}/${item.slug}`}>
                <div>
                  <h3>{item.title}</h3>
                </div>

                <div>
                  <span>Type: {item.model?.title}</span>
                </div>
              </Link>

              <br />
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const singleton = await Starlight.singletons.get<Home>('homepage')
  const recentItems = await Starlight.search.entries({ limit: 10 })
  const monthItems = await Starlight.collection<Entry<any>>('items-of-the-month').items()
  return { props: { singleton, recentItems, monthItems } }
}

export default Home