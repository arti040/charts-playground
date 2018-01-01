// === Chart's opts
// @desc Definitions for some default Highcharts' config objects

import { colors } from './chartColors';
import { labels } from './labels';

export const chartOpts = {
  width: 1160,
  marginRight: 160,
  legend: {
    align: 'right', 
    verticalAlign: 'middle', 
    layout: 'vertical', 
    floating: false
  },
  annotationsOptions: {
    enabledButtons: false
  }
}

export const breakLabelOpts = {
  text: 'BREAK', 
  rotation: 90, 
  align: 'center', 
  verticalAlign: 'top', 
  textAlign: 'left', 
  x: -5,
  color: null
}

export const breakOpts = {
  color: null,
  label: breakLabelOpts,
  from: null,
  to: null,
  events: {}
}

export const rangeOpts = {
  type: 'arearange',
  fillOpacity: 0.3,
  zIndex: -1
}

export const periodLabelOpts = {
  text: null,
  rotation: 90,
  textAlign: 'left',
  color: '#cce6ff',
  x: -5
}

export const serieOpts = {
  valShr: { color: colors.blue, data: [], name: labels.valShare },	
  trend: { color: colors.darkBlue, data: [], name: 'Trend' },
  localOutliner: { color: colors.orange, data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: labels.locOutlier },
  globalOutliner: { color: colors.red, data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: labels.globOutlier },
  range: { color: colors.lightBlue, data: [], name: labels.range }
}

export const periodOpts = {
  label: periodLabelOpts,
  from: null,
  to: null
}