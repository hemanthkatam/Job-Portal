import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from './fake-data';
import { loadJobById } from './Requests'

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    const { jobId } = this.props.match.params;
    this.state = { job: null };
  }
  async componentDidMount() {
    const { jobId } = this.props.match.params;
    const job = await loadJobById(jobId);
    this.setState({ job: job.jobById })
    console.log(job)
  }

  render() {
    const { job } = this.state;
    if (!job) {
      return null
    }
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
