import Starlight, { Entry, VisualContent } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Publication } from '@/starlight'
import Link from 'next/link'

type PublicationProps = {
  publication: Entry<Publication>
}

const Publication = ({ publication }: PublicationProps) => {

  return (
    <>
      <div>
        <h1>{publication.title}</h1>
      </div>

      <div>
        <span>Ano {publication.data.year}</span>
      </div>

      <div>
        <span>Available? {publication.data.is_available ? 'Sim' : 'Não'}</span>
      </div>

      <div>
        <VisualContent content={publication.data.excerpt} />
      </div>

      <br />

      <div>
        <Link href={`/newspaper/${publication.data.newspaper.object.slug}`}>Ir para jornal</Link>
      </div>

      <br />

      <div>
        <Link href="/publications">Back to listing</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PublicationProps> = async ({ params }) => {
  const response = await Starlight.publications.entries.get(params?.slug as string)
  return { props: { publication: response.data } }
}

export default Publication