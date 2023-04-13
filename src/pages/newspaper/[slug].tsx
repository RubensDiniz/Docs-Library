/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Newspaper } from '@/starlight'
import Link from 'next/link'

type NewspaperProps = {
  newspaper: Entry<Newspaper>
}

const Newspaper = ({ newspaper }: NewspaperProps) => {

  return (
    <>
      <div>
        <img src={newspaper.data.logo.files[1].path} alt={newspaper.slug} width='400px' height='400px' style={{ backgroundColor: 'white' }}/>
      </div>

      <div>
        <h1>{newspaper.title}</h1>
      </div>

      <br />

      <div>
        <Link href="/newspapers">Back to listing</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<NewspaperProps> = async ({ params }) => {
  const response = await Starlight.newspapers.entries.get(params?.slug as string)
  return { props: { newspaper: response.data } }
}

export default Newspaper