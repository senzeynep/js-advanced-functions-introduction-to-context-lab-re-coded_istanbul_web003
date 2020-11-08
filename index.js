function createEmployeeRecord([firstName, familyName, title, payRatePerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payRatePerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    let employee = []
    for (let i=0; i<employees.length; i++) {
        employee.push(createEmployeeRecord(employees[i]))
    }
    return employee
}

function createTimeInEvent(employee, dateInfo) {
    let date = dateInfo.split(" ")
    let time= date[1]
    let hour = parseInt(time) %100
    let minutes = parseInt(time) - hour
    let recordObject = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date[0]
    }
    employee.timeInEvents.push(recordObject)
    return employee
}

function createTimeOutEvent(employee, dateInfo) {
    let date = dateInfo.split(" ");
    let time = date[1];
    let hour = parseInt(time) % 100;
    let minutes = parseInt(time) - hour;
    let recordObject = {
        type: "TimeOut" ,
        hour: parseInt(time),
        date : date[0]
    }
    employee.timeOutEvents.push(recordObject)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    for (let i=0; i<employee.timeInEvents.length; i++) {
        if (employee.timeInEvents[i].date === date && employee.timeOutEvents[i].date === date) {
        return (employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour) / 100
        }
    }
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

let allWagesFor = (employee) => {
    let dateStrings = employee.timeInEvents.map(element => {
        return element.date;
    });

    return dateStrings.reduce((acc, element) => {
        return acc + wagesEarnedOnDate(employee, element);
    }, 0);
}

let calculatePayroll = (employees) => {
    return employees.reduce((acc, element) => {
        return acc + allWagesFor(element);
    }, 0);
};

function findEmployeeByFirstName(myArray, firstName) {
   return myArray.find(element => {
       return element.firstName === firstName
   })
}