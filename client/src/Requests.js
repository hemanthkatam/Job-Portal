const GRAPH_URL = 'http://localhost:9000/graphql';

const fetchGraphql = async (query, variables = {}) => {
  const response = await fetch(GRAPH_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',

    },
    body: JSON.stringify({
      query: query,
      variables,
    })
  });
  const resBody = await response.json();
  if (resBody.errors) {
    const message = resBody.errors.map(error => error.message).join('/n')
    throw new Error(message)
  }

  return resBody.data;
}

export const createJob = async (input) => {
  const query = `mutation CreateJob($input:CreateJobInput){
  Job: createJob(input: $input){
    id
    title
    description
    company{
      id
      name
    }
  }
}`
  const { Job } = await fetchGraphql(query, { input });

  return Job;
}

export const loadCompanyById = async (id) => {

  const query = `query companyByIdQuery($id: ID!){
    companyById(id: $id){
      id
      name
      description
      jobs{
        id
        title
      }
    }
  }`
  const response = await fetchGraphql(query, { id });

  return response;
}
export const loadJobById = async (id) => {
  const query = `query jobQuery($id: ID!){
    jobById(id: $id){
      id
      title
      company{
        id
        name
        description
      }
      description
    }
  }`
  const response = await fetchGraphql(query, { id })



  return response;
}
export const loadJobs = async () => {
  const query = `{
    jobs{
      id
      title
      company{
        id
        name
      }
    }
  }`
  const response = await fetchGraphql(query)



  return response;
}