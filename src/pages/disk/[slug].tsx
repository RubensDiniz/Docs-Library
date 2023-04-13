/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry } from '@starlightcms/next-sdk'
import { GetServerSideProps } from 'next'
import { Disk } from '@/starlight'
import Link from 'next/link'

type DiskProps = {
  disk: Entry<Disk>
}

const Disk = ({ disk }: DiskProps) => {

  return (
    <>
      <div>
        <img src={disk.data.cover_picture.files[1].path} alt={disk.slug} />
      </div>

      <div>
        <h1>{disk.title}</h1>
      </div>

      <div>
        <span>Available? {disk.data.is_available ? 'Sim' : 'Não'}</span>
      </div>

      <br />

      <div>
        <Link href="/disks">Back to listing</Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<DiskProps> = async ({ params }) => {
  const response = await Starlight.disks.entries.get(params?.slug as string)
  return { props: { disk: response.data } }
}

export default Disk