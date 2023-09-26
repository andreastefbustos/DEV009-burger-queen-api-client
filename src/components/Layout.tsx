import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout({excludes}: {excludes: string[]}): JSX.Element {
  return (
    <div> 
      <Header excludes={excludes}/>
      <Outlet />
    </div>
  )
}