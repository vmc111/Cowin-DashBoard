// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BarComponent from '../VaccinationCoverage'
import PieByGender from '../VaccinationByGender'
import PieByAge from '../VaccinationByAge'
import './index.css'

const statusObject = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
export default class CowinDashboard extends Component {
  state = {apiStatus: statusObject.initial, responseList: []}

  componentDidMount() {
    this.apiCall()
  }

  onSucessApi = data => {
    // console.log(data)
    const formattedData = {
      last7DaysVaccination: data.last_7_days_vaccination.map(item => ({
        vaccineDate: item.vaccine_date,
        dose1: item.dose_1,
        dose2: item.dose_2,
      })),
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    this.setState({
      apiStatus: statusObject.success,
      responseList: formattedData,
    })
  }

  apiCall = async () => {
    this.setState({apiStatus: statusObject.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    const data = await response.json()

    if (response.ok) {
      this.onSucessApi(data)
    }
  }

  render() {
    const {apiStatus, responseList} = this.state
//     console.log(apiStatus, responseList)

    const loadingView = (
      <div className="loading-div">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )

    const failureView = (
      <div className="failure-div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-text">Something Went Wrong.</p>
      </div>
    )

    const successView = (
      <div className="success-bg">
        <BarComponent data={responseList.last7DaysVaccination} />
        <PieByGender data={responseList.vaccinationByGender} />
        <PieByAge data={responseList.vaccinationByAge} />
      </div>
    )

    let bodyOfPage

    switch (apiStatus) {
      case statusObject.inProgress:
        bodyOfPage = loadingView
        break

      case statusObject.failure:
        bodyOfPage = failureView
        break
      case statusObject.success:
        bodyOfPage = successView
        break
      default:
        bodyOfPage = null
        break
    }

    return (
      <div className="bg-main">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
            alt="website logo"
            className="logo"
          />
          <p className="header-title">Co-WIN</p>
        </div>
        <h1 className="text">Co-WIN vaccination in India</h1>
        {bodyOfPage}
      </div>
    )
  }
}
