const db = require('./db')
const Query = {
    companyById: (root, { id }) => {
        console.log('root', root)
        return db.companies.get(id)
    },
    jobById: (root, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list()
}

const Company = {
    jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
}
const Job = {
    company: (job) => db.companies.get(job.companyId)
}
const Mutation = {
    createJob: (root, { input }, { user }) => {
        if (!user) {
            throw new Error('UnAuthorized')
        }
        const id = db.jobs.create(input);
        return db.jobs.get(id)

    }
}
module.exports = {
    Query, Company, Mutation, Job
}