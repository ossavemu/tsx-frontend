import Overview from './Dashboard/Overview'
import Variables from './Dashboard/Variables'
import * as dataCompetitor from './competitor/Competitor'
import { useState } from 'react'

const Dashboard = () => {
  const [page, setPage] = useState('Competitor')
  const [
    dataset$Alerts,
    dataset$Overview,
    dataset$Variables,
    dataset$VarData
  ] = (() => {
    if (page === 'Competitor') {
      return [
        dataCompetitor.dataset$Alerts,
        dataCompetitor.dataset$Overview,
        dataCompetitor.dataset$Variables,
        dataCompetitor.dataset$VarData
      ]
    }
    return [[], [], [], []]
  })()
  return (
    <>
      <Overview
        data={[dataset$Alerts, dataset$Overview, dataset$Variables]}
        page={page}
        setPage={setPage}
      ></Overview>
      <Variables data={[dataset$VarData]}></Variables>
    </>
  )
}
export default Dashboard
