const moment = require ('moment')
const {models:{Issue}} = require ('dashboard-data')
const momentRandom = require('moment-random')

const helper ={ 

    randomHelper(array){
        let randomIndex = Math.floor(Math.random() * array.length) 
        let randomElement = array[randomIndex]
        return randomElement
    },
    diffBetweenDates(starDate, endDate){
        let first = moment(starDate);
        let second = moment(endDate);
        return second.diff(first, 'days')
    },
    async loadDataBase(month){
        let _month= moment().month(month)
                let start = moment(_month).startOf('month').format('YYYY-MM-DD')
                let end =moment(_month).endOf('month').format('YYYY-MM-DD') 
                let days = helper.diffBetweenDates(start,end)
                let countries=['ES', 'PL', 'IT']
                let issueType = ['HotFix', 'BugFix', 'Bug', 'Request']
                let status = ['To Do', 'Done']
                let resolution = ["Won't Fix", 'Done', 'Is not a Bug', 'Cannot Reproduce', 'Duplicate']
                let due 
                due = moment(start).add(1, 'days').format('YYYY-MM-DD')
                for (let i=0; i<days; i++){
                    await Issue.create({
                                key: `DOC-${i}`, 
                                issueType: helper.randomHelper(issueType),
                                country: helper.randomHelper(countries),
                                createdDate: start, 
                                dueDate : due,
                                status: helper.randomHelper(status),
                                resolutionType: helper.randomHelper(resolution),
                                resolutionDate: momentRandom(end, start).format('YYYY-MM-DD')
                            })
                            start=moment(start).add(1, 'days').format('YYYY-MM-DD')
                            due=moment(due).add(1, 'days').format('YYYY-MM-DD')
                }
    },
    async setOverdue(){
        const overdue=['yes', 'no']
        const issues = await Issue.find()
            issues.forEach( async(issue)=>{
                
                    await Issue.findByIdAndUpdate(issue.id, { $set: { overdue: await helper.randomHelper(overdue) } });
                

            })
    }

}
module.exports=helper