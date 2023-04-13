/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, VisualContent } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Magazine } from '@/starlight'
import Link from 'next/link'

type MagazineProps = {
  magazine: Entry<Magazine>
}

const Magazine = ({ magazine }: MagazineProps) => {

  return (
    <>
      <div>
        <img src={magazine.data.cover_picture.files[1].path} alt={magazine.slug} />
      </div>

      <div>
        <h1>{magazine.title}</h1>
      </div>

      <div>
        <span>Edição {magazine.data.issue_number}</span>
      </div>

      <div>
        <span>Mês {magazine.data.month}</span>
      </div>

      <div>
        <span>Ano {magazine.data.year}</span>
      </div>

      <div>
        <span>Available? {magazine.data.is_available ? 'Sim' : 'Não'}</span>
      </div>

      <div>
        <VisualContent content={magazine.data.excerpt}/>
      </div>

      <br />

      <div>
        <Link href="/magazines">Back to listing</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<MagazineProps> = async ({ params }) => {
  const response = await Starlight.magazines.entries.get(params?.slug as string)
  return { props: { magazine: response.data } }
}

export default Magazine