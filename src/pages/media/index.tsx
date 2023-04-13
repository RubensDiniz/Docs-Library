/* eslint-disable @next/next/no-img-element */
import Starlight, { StarlightListResponse } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'

type MediaProps = {
  media: StarlightListResponse<any>
}

const Media = ({ media }: MediaProps) => {
  return (
    <>
      {media.data.map((item) => (
        <div key={item.title}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<MediaProps> = async () => {
  const media = await Starlight.media.list()
  return { props: { media } }
}

export default Media