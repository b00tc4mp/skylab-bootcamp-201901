const models = require ('../data/models')
const jiraApi = require('../data/jira-api')
const moment = require('moment')
const validate = require('../common/validate')


const { Issues } = models

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

                        await Issues.create({
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
            const issues = await Issues.find()
            issues.forEach( async(issue)=>{
                let duedate=moment(issue.dueDate).format('YYYY-MM-DD')
                let resolutiondate = moment(issue.resolutionDate).format('YYYY-MM-DD')
                if(duedate< today){
                    if (duedate< resolutiondate){
                        await Issues.findByIdAndUpdate(issue.id, { $set: { overdue: 'yes' } });
                    }else {
                        await Issues.findByIdAndUpdate(issue.id, { $set: { overdue: 'no' } });
                    }
                }else{
                    await Issues.findByIdAndUpdate(issue.id, { $set: { overdue: 'no' } });
                }

            })
            
        })()
    },
    clearUp(){
        return(async ()=>{
            await Issues.deleteMany()
        })()
    }
}

module.exports = logic