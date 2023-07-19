import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  // todo:查Redis有没有,转发链接
  useEffect(() => {
    window.location.href = 'https://home.l0l.ink' + window.location.pathname
  })
  return <div />
}

export async function getStaticProps() {
  const props = (await getGlobalNotionData({ from: '404' })) || {}
  return { props }
}

export default NoFound
