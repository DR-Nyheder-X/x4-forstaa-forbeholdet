import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import CardNavigation from './CardNavigation'
import { categories, find } from '../Repo'
import minMax from '../utils/minMax'

function nextStepIndexInCategory (progress, category) {
  return category.steps.reduce((next, step) => {
    const index =
      progress.completedQuestionIds.indexOf(step.question.id)
    next = index > -1 ? index + 1 : next
    return minMax(0, category.steps.length, next)
  }, 0)
}

@connect(state => ({
  pathname: state.router.location.pathname,
  type: state.router.params.type,
  progress: state.progress
}))
export default class Category extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  componentDidMount () {
    const { progress, type, pathname, history } = this.props
    const category = find(c => c.type === type)
    const nextStep = nextStepIndexInCategory(progress, category)
    history.replaceState(null, `${pathname}/${nextStep}`)
  }

  render () {
    return (
      <div>Redirecting...</div>
    )
  }
}