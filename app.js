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
}
const newTeam = new Team();
newTeam.managerQuestions();