import React from 'react'
import dynamic from 'next/dynamic'


// Disable SSR for loading MDE
const IssueForm = dynamic(
  ()=> import('@/app/issues/_components/IssueForm'),
  {ssr: false}
)


const NewIssuePage = () => {
  return (
   <IssueForm />
  )
}

export default NewIssuePage