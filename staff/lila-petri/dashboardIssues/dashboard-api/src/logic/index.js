const {models:{Issue, User}, jiraApi, mongoose:{Types}} = require ('dashboard-data')
const moment = require('moment')
const validate = require('dashboard-validate')
const { LogicError , RequirementError , FormatError }= require('dashboard-errors')
const argon2 = require('argon2')

const logic = {
    loadJirasByMonth(id, month){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true},
            { name: 'month', value: month, type: 'string', notEmpty: true},
        ])
        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')
        let _month= moment().month(month)
        let start = moment(_month).startOf('month').format('YYYY-MM-DD')
        let end =moment(_month).endOf('month').format('YYYY-MM-DD')
        let startDate=moment(start).format('YYYY-MM-DD')
        let endDate= moment(start).add(1, 'days').format('YYYY-MM-DD')

        return(async()=>{

            const user = await User.findById(id)
            
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)

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
    calculateOverdue(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true}
        ])

        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')

        let today=moment().format('YYYY-MM-DD')

        return(async()=>{
            const user = await User.findById(id)
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)
            
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
    clearUp(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true}
        ])

        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')

        return(async ()=>{
            const user = await User.findById(id)
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)

            await Issue.deleteMany()
        })()
    },
    retrieveIssuesByResolution(id, issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true},
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])

        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')
        
        if(!moment(startDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')
        if(!moment(endDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')

        startDate = moment(startDate).toDate()
        endDate = moment(endDate).toDate()

        if (endDate<startDate) throw new RequirementError ('incorrect date range')
        
        return (async()=>{
            const user = await User.findById(id)
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)

            if(!await Issue.findOne({ country })) throw new RequirementError ('incorrect country')
        
            if(!await Issue.findOne({ issueType })) throw new RequirementError ('incorrect issueType')

            let countCR = 0
            let countDone = 0
            let countDup = 0
            let countInc = 0
            let countIsNot = 0
            let countWF = 0
            let countNone=0
            let countTotal=0
            
            
            const issuesByCountryAndDate= await Issue.findIssuesByCountryDateIssueType(issueType, country, startDate, endDate)
            issuesByCountryAndDate.forEach(element => {
                switch (element.resolutionType){
                    case 'Cannot Reproduce':
                        countCR++
                        break;
                    case 'Done':
                        countDone++
                        break;
                    case 'Duplicate':
                        countDup++
                        break;
                    case 'Incomplete':
                        countInc++
                        break;
                    case 'Is not a Bug':
                        countIsNot++
                        break;
                    case "Won't Fix":
                        countWF++
                        break;
                    default:
                        countNone++

                }
                countTotal++
            })

            return  {'Cannot Reproduce': countCR, 
                    'Done' : countDone, 
                    'Duplicate' : countDup, 
                    'Incomplete' : countInc, 
                    'Is not a Bug': countIsNot, 
                    "Won't Fix" : countWF, 
                    'Unresolved' : countNone,
                    'Total' : countTotal
                }

        })()

    },
    retrieveIssuesBySLA(id,issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true},
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])
        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')

        if(!moment(startDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')
        if(!moment(endDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')

        startDate = moment(startDate)
        endDate = moment(endDate)

        if (endDate<startDate) throw new RequirementError ('incorrect date range')
        return (async()=>{
            const user = await User.findById(id)
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)

            if(!await Issue.findOne({ country })) throw new RequirementError ('incorrect country')
            
            if(!await Issue.findOne({ issueType })) throw new RequirementError ('incorrect issueType')

            let start = moment(startDate).format('YYYY-MM-DD')
            let end 
            end = moment(startDate).add(1, 'days').format('YYYY-MM-DD')
            endDate = endDate.format('YYYY-MM-DD')
            let sla = []
            
            while(end <= endDate){ 
        
                let countOverdue = 0
                let countOnTime = 0
                let countTotal = 0
                let created
                
                let issuesByCountryAndDate= await Issue.findIssuesByCountryDateIssueType(issueType, country, moment(start).toDate(), moment(end).toDate())

                if(issuesByCountryAndDate.length===0){
                    sla.push({created : moment(start).format('YYYY-MM-DD'), 
                        overdue : countOverdue,
                        ontime : countOnTime,
                        total : countTotal})

                }else {
                        if(issuesByCountryAndDate.every(element => element.createdDate.getTime() === issuesByCountryAndDate[0].createdDate.getTime())){
                            
                            created = moment(issuesByCountryAndDate[0].createdDate).format('YYYY-MM-DD')
                            
                            issuesByCountryAndDate.forEach(element =>{
                                
                                if(element.overdue==='yes') countOverdue++
                                else countOnTime++
                                
                                countTotal++
                            })

                            sla.push({  created : created, 
                                        overdue : countOverdue,
                                        ontime : countOnTime,
                                        total : countTotal  })            

                        } else throw Error ('no todas son la misma fecha')
                    }
                
                start=moment(start).add(1, 'days').format('YYYY-MM-DD')
                end=moment(end).add(1, 'days').format('YYYY-MM-DD')
            }
            return sla
        })()

    },
    retrieveIssuesByTable(id, country, startDate, endDate){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])

        if (!Types.ObjectId.isValid(id)) throw new FormatError('invalid id')
        if(!moment(startDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')
        if(!moment(endDate, moment.ISO_8601).isValid()) throw new FormatError ('incorrect date')

        startDate = moment(startDate)
        endDate = moment(endDate)

        if (endDate<startDate) throw new RequirementError ('incorrect date range')
        let table=[]
        let countOverdue = 0
        let countOnTime = 0
        let countTotal = 0

        function resetCounts(){
            countOverdue = 0
            countOnTime = 0
            countTotal = 0
        }

        return(async ()=>{
            const user = await User.findById(id)
            
            if(!user) throw new LogicError(`user with id "${id}" does not exist`)

            if(!await Issue.findOne({ country })) throw new RequirementError ('incorrect country')
            
            async function addResults(issueType){
                let issues= await Issue.findIssuesByCountryDateIssueType(issueType, country, moment(startDate).toDate(), moment(endDate).toDate())
                
                issues.forEach(element =>{
                                    
                    if(element.overdue==='yes') countOverdue++
                    else countOnTime++
                    
                    countTotal++
                })
                table.push({  issueType: issueType, 
                            overdue : countOverdue,
                            ontime : countOnTime,
                            total : countTotal  })
                resetCounts()
            }
            await addResults('HotFix')
            await addResults('BugFix')
            await addResults('Bug')
            await addResults('Request')
            
            return table
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
            try{
                const hash = await argon2.hash(password)
                const user = await User.findOne({ email }) 
                if (user) throw new LogicError(`user with username \"${email}\" already exists`)
                await User.create({ name, surname, email, password: hash, profile, country })

            }catch(err){
                
                throw Error (err.message)

            }


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
            
            if (user && await argon2.verify(user.password, password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },
    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true}
        ])

        return (async () => {
            
            const user = await User.findById(id)
            if(user){
                const { name, surname, email, country, profile} = user
                
                return { name, surname, email, country, profile}

            } else throw new LogicError('user not found')

        })()
    },
    updateUser(id, name, surname, country ){
        
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true},
            { name: 'name', value: name, type: 'string', optional: true},
            { name: 'surname', value: surname, type: 'string', optional: true},
            { name: 'country', value: country, type: 'string', optional: true}
        ])

        return (async () => {
            const user = await User.findById(id)
        
            if (!user) throw new LogicError(`user not found`)

            const body = {
                name: name || user.name,
                surname: surname ||  user.surname,
                country: country || user.country   
            }
            
            await User.findByIdAndUpdate(id, body)
            
        })()
    },
    deleteUser(id){
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true}
        ])
        return (async () => {

            const user = await User.findById(id)

            if(user){

                await User.findByIdAndRemove({_id:id})

                return

            } else throw new LogicError('user not found')

        })()

    }
    
}

module.exports = logic