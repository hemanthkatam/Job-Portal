import React, { Component } from 'react';
import { companies } from './fake-data';
import { loadCompanyById } from './Requests'
import { JobList } from './JobList';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    const { companyId } = this.props.match.params;
    this.state = { company: null };
  }
  async componentDidMount() {

    const { companyId } = this.props.match.params;
    const job = await loadCompanyById(companyId);
    this.setState({ company: job.companyById })
    console.log(job)
  }
  render() {
    const { company } = this.state;
    if (!company) {
      return null;

    }
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5>Jobs at copany</h5>
        <JobList jobs={company.jobs} />
      </div>
    );
  }
}
