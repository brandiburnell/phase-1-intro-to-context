// Your code here

function createEmployeeRecord(employeeInfo) {
    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    // console.log(employeeRecord);
    return employeeRecord;
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateStamp) {
    const timeInEvent = {
        type: "TimeIn",
        hour: Number(dateStamp.substring(11,15)),
        date: dateStamp.substring(0, 10)
    };
    // console.log(timeInEvent);
    // console.log(employee.timeInEvents);
    employee.timeInEvents.push(timeInEvent);
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const timeOutEvent = {
        type: "TimeOut",
        hour: Number(dateStamp.substring(11,15)),
        date: dateStamp.substring(0, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
}

function hoursWorkedOnDate(employee, givenDate) {
    // console.log(employee.timeInEvents);
    let startingTime = employee.timeInEvents.find(e => e.date === givenDate);
    let endingTime = (employee.timeOutEvents.find(e => e.date === givenDate));

    // console.log(endingTime.hour);
    // console.log(startingTime.hour);
    // console.log((endingTime.hour - startingTime.hour)/100);
    return (endingTime.hour - startingTime.hour)/100;
}

function wagesEarnedOnDate(employee, givenDate) {
    const hoursWorked = hoursWorkedOnDate(employee, givenDate);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = [];
    employee.timeInEvents.forEach(element => {
        datesWorked.push(element.date);
    });

    let totalWages = datesWorked.map(date => wagesEarnedOnDate(employee, date));
    return totalWages.reduce((accumulator, currentValue) => accumulator+ currentValue, 0);
}

function calculatePayroll(employeeRecords) {
    const moneyOwedToEmployees = [];
    employeeRecords.forEach(employee => {
        moneyOwedToEmployees.push(allWagesFor(employee));
    });
    // console.log(moneyOwedToEmployees);
    return moneyOwedToEmployees.reduce((accum, currentVal ) => accum + currentVal, 0);
}