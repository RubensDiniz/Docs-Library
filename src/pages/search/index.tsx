/* eslint-disable @next/next/no-img-element */
import Starlight, { Entry, VisualContent } from '@starlightcms/next-sdk'
import Link from 'next/link'
import { SyntheticEvent, useRef, useState } from 'react'


const Search = () => {
  const ref = useRef<HTMLFormElement>(null)

  const [items, setItems] = useState<Entry<Record<string, unknown>>[]>([])

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const data = new FormData(ref.current as HTMLFormElement)
    const response = await Starlight.search.entries({
      query: data.get('query')?.toString()
    })

    setItems(response.data)

    ref.current?.reset()
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        ref={ref}
      >
        <div>
          <span>Search: </span>
          <input type="text" id="query" name="query" />
        </div>

        <br />

        <div>
          <button>
            Enviar
          </button>
        </div>
      </form>

      <br />
      <hr />
      <br />

      {items.map((item) => (
        <>
          <Link href={`/${item.model?.title.slice(0, -1).toLowerCase()}/${item.slug}`} key={item.slug}>
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
    </>
  )
}

export default Search