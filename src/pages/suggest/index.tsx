/* eslint-disable @next/next/no-img-element */
import { SyntheticEvent, useRef } from 'react'
import Starlight from '@starlightcms/next-sdk'

const Suggest = () => {
  const ref = useRef<HTMLFormElement>(null)

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    
    const data = new FormData(ref.current as HTMLFormElement)
    data.set("accepted_newsletter", String(data.get("accepted_newsletter") === "on"))
    await fetch("https://submit.advancecomunicacao.com.br/v2/organizations/testedocs/workspaces/livraria/forms/suggestions",
      { method: 'post', body: data })

    ref.current?.reset()
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        ref={ref}
      >
        <div>
          <span>Name: </span>
          <input type="text" id="name" name="name" />
        </div>

        <br />

        <div>
          <span>Item title: </span>
          <input type="text" id="item_title" name="item_title" />
        </div>

        <br />

        <div>
          <span>Newsletter: </span>
          <input type="checkbox" id="accepted_newsletter" name="accepted_newsletter" />
        </div>

        <br />

        <div>
          <button>
            Send
          </button>
        </div>
      </form>
    </>
  )
}

export default Suggest