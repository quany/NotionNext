// import { getGlobalNotionData } from '@/lib/notion/getNotionData'
// import * as ThemeMap from '@/themes'
// import { useGlobal } from '@/lib/global'

import { useEffect } from 'react'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  // todo:查Redis有没有,转发链接
  useEffect(() => {
    window.location.href = `https://home.l0l.ink${window.location.pathname}`;
  });
  return (<div>not Found<div/>);
  // const { theme, siteInfo } = useGlobal()
  // const ThemeComponents = ThemeMap[theme]
  // const meta = { title: `${props?.siteInfo?.title} | 页面找不到啦`, image: siteInfo?.pageCover }
  // return <ThemeComponents.Layout404 {...props} meta={meta}/>
}

export async function getStaticProps () {
  const props = (await getGlobalNotionData({ from: '404' })) || {}
  return { props }
}

export default NoFound
