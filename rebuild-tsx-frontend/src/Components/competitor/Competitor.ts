import * as data from '../../dev-queries/competitor.json'

export const dataset = JSON.parse(JSON.stringify(data))
export const dataset$Overview = JSON.parse(JSON.stringify(dataset[0][1]))
export const dataset$Variables = JSON.parse(JSON.stringify(dataset[1][1]))
export const dataset$Alerts = JSON.parse(JSON.stringify(dataset[2][1]))
export const dataset$VarData = JSON.parse(JSON.stringify(dataset[3]))
