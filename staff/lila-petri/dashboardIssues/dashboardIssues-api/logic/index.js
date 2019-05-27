const models = require ('../data/models')
const jiraApi = require('../data/jira-api')
const moment = require('moment')
const validate = require('../common/validate')
const { LogicError }= require('../common/errors')
const argon2 = require('argon2')

const { Issue, User } = models

const logic = {
    loadJirasByMonth(month){
        validate.arguments([
            { name: 'month', value: month, type: 'string', notEmpty: true},
        ])
        let _month= moment().month(month)
        let start = moment(_month).startOf('month').format('YYYY-MM-DD')
        let end =moment(_month).endOf('month').format('YYYY-MM-DD')
        let startDate=moment(start).format('YYYY-MM-DD')
        let endDate= moment(start).add(1, 'days').format('YYYY-MM-DD')

        return(async()=>{

            while(startDate<end){

                const jiras= await jiraApi.searchIssues(startDate.toString(), endDate.toString())
                const {total, issues}= jiras

                if (total>0){

                    issues.forEach(async (element) => {
                        let createdDate= moment(element.fields.created).format('YYYY-MM-DD')
                        let resolutionType
                        let resolutionDate

                        if(element.fields.resolution === null){
                            resolutionType='None'
                            resolutionDate= moment().add(1, 'months').format('YYYY-MM-DD')

                        }else{
                            resolutionType=element.fields.resolution.name
                            resolutionDate= moment(element.fields.resolutiondate).format('YYYY-MM-DD')
                        }

                        await Issue.create({
                            key: element.key, 
                            issueType: element.fields.issuetype.name,
                            country: element.fields.customfield_11528.value,
                            createdDate, 
                            dueDate : element.fields.duedate,
                            status: element.fields.status.name,
                            resolutionType,
                            resolutionDate
                        })
                    })
                }

                startDate=moment(startDate).add(1, 'days').format('YYYY-MM-DD')
                endDate=moment(endDate).add(1, 'days').format('YYYY-MM-DD')
            }
        })()

    },
    calculateOverdue(){

        let today=moment().format('YYYY-MM-DD')

        return(async()=>{
            const issues = await Issue.find()
            issues.forEach( async(issue)=>{
                let duedate=moment(issue.dueDate).format('YYYY-MM-DD')
                let resolutiondate = moment(issue.resolutionDate).format('YYYY-MM-DD')
                if(duedate< today){
                    if (duedate< resolutiondate){
                        await Issue.findByIdAndUpdate(issue.id, { $set: { overdue: 'yes' } });
                    }else {
                        await Issue.findByIdAndUpdate(issue.id, { $set: { overdue: 'no' } });
                    }
                }else{
                    await Issue.findByIdAndUpdate(issue.id, { $set: { overdue: 'no' } });
                }

            })
            
        })()
    },
    clearUp(){
        return(async ()=>{
            await Issue.deleteMany()
        })()
    },
    registerUser(name, surname, email, password, profile, country) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true},
            { name: 'surname', value: surname, type: 'string', notEmpty: true},
            { name: 'email', value: email, type: 'string', notEmpty: true},
            { name: 'password', value: password, type: 'string', notEmpty: true},
            { name: 'profile', value: profile, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
        ])

        validate.email(email)

        return (async () => {
            const hash = await argon2.hash(password)
            const user = await User.findOne({ email }) 
            if (user) throw new LogicError('user already exists')
            await User.create({ name, surname, email, password: hash, profile, country })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true},
            { name: 'password', value: password, type: 'string', notEmpty: true},
        ])
        validate.email(email)

        return (async () => {
            const user = await User.findOne({ email })

            if (await argon2.verify(user.password, password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true}
        ])

        return (async () => {
            
            const { name, surname, email, country, profile } = await User.findById(id)

            return { name, surname, email, country, profile}
        })()
    },
}

module.exports = logic