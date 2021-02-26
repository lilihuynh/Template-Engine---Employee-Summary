const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



let employees = [];

let ID = [];


// class team include managers and their team members:
class Team {

    //prompt questions about manager
    managerQuestions() {
        console.log("Please build your team")
        return inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?"

            },

            {
                type: "input",
                name: "managerID",
                message: "What is your manager's ID?",
                validate: (userID) => {
                    if (ID.indexOf(userID) === -1) {
                        return true;
                    }
                    console.log("This ID is already exist");
                    return managerQuestions();
                }
            },

            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?"
            },

            {
                type: "input",
                name: "managerOfficeNumer",
                message: "What is your manager's office number?"
            }


        ]).then(response => {
            const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumer);
            ID.push(response.managerID);
            //push new manager to employee array
            employees.push(newManager);

            //then running promt function to add member

            this.membersRole();


        })
    };

    //promt questions to add team members
    membersRole() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                name: "role",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(response => {
            switch (response.role) {
                case "Engineer":
                    this.engineerQuestions();
                    break;

                case "Intern":
                    this.internQuestions();
                    break;

                case "I don't want to add any more team members":
                    this.end();
                    console.log(employees)

            }
        })
    }

    //promt questions for Engineer
    engineerQuestions() {
        return inquirer.prompt([
            {
                type: "input",
                message: "What is your Engineer's name?",
                name: "engineerName",

            },

            {
                type: "input",
                message: "What is your engineer's ID?",
                name: "engineerID",
                validate: (userID) => {
                    if (ID.indexOf(userID) === -1) {
                        return true;
                    }
                    console.log("This ID is already exist");
                    return engineerQuestions();
                }

            },

            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail",

            },

            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGitHub",

            },


        ]).then(response => {

            const newEngineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGitHub);
            ID.push(response.engineerID);

            //push new engineer to employee array
            employees.push(newEngineer);

            //then running prompt function to add member

            this.membersRole();

        })
    }

    //prompt questions for Intern
    internQuestions() {
        return inquirer.prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "interName",

            },

            {
                type: "input",
                message: "What is your intern's ID?",
                name: "internID",
                validate: (userID) => {
                    if (ID.indexOf(userID) === -1) {
                        return true;
                    }
                    console.log("This ID is already exist");
                    return internQuestions();
                }
            },

            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail",

            },

            {
                type: "input",
                message: "What is your intern's school?",
                name: "internSchool",

            },


        ]).then(response => {

            const newIntern = new Intern(response.interName, response.internID, response.internEmail, response.internSchool);
            ID.push(response.internID);

            //push new intern to employee array
            employees.push(newIntern);

            //then running prompt function to add member

            this.membersRole();

        })
    }

    //when user does not want to add more members
    end() {
        const newMemberFile = render(employees);
        fs.writeFile(outputPath, newMemberFile, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

        });
    }

}
const newTeam = new Team();
newTeam.managerQuestions();