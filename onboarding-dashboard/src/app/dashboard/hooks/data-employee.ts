export interface Employee {
  id: number
  name: string
  surname: string
  emailCorporative: string
  salary: number
  country: string
  departament?: string
  dateOfAdmission: string
}

export const employees: Employee[] = [
  { id: 1, name: "John", surname: "Doe", emailCorporative: "john.doe@company.com", salary: 4500, departament:"IT solution" ,country: "USA", dateOfAdmission: "2022-03-15" },
  { id: 2, name: "Jane", surname: "Smith", emailCorporative: "jane.smith@company.com", salary: 5200, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2021-07-22" },
  { id: 3, name: "Michael", surname: "Brown", emailCorporative: "michael.brown@company.com", salary: 6100, departament:"IT solution" ,country: "USA", dateOfAdmission: "2020-11-05" },
  { id: 4, name: "Emily", surname: "Davis", emailCorporative: "emily.davis@company.com", salary: 4800, departament:"IT solution" ,country: "UK", dateOfAdmission: "2019-08-12" },
  { id: 5, name: "David", surname: "Wilson", emailCorporative: "david.wilson@company.com", salary: 7500, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2023-01-10" },
  { id: 6, name: "Sarah", surname: "Johnson", emailCorporative: "sarah.johnson@company.com", salary: 6800, departament:"IT solution" ,country: "France", dateOfAdmission: "2020-05-18" },
  { id: 7, name: "Robert", surname: "Miller", emailCorporative: "robert.miller@company.com", salary: 5400, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-12-01" },
  { id: 8, name: "Jessica", surname: "Taylor", emailCorporative: "jessica.taylor@company.com", salary: 4700, departament:"IT solution" ,country: "UK", dateOfAdmission: "2022-06-20" },
  { id: 9, name: "Daniel", surname: "Anderson", emailCorporative: "daniel.anderson@company.com", salary: 7200, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2021-09-10" },
  { id: 10, name: "Laura", surname: "Thomas", emailCorporative: "laura.thomas@company.com", salary: 5000, departament:"IT solution" ,country: "USA", dateOfAdmission: "2019-03-25" },
  { id: 11, name: "James", surname: "Jackson", emailCorporative: "james.jackson@company.com", salary: 5900, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2020-07-15" },
  { id: 12, name: "Megan", surname: "White", emailCorporative: "megan.white@company.com", salary: 5300, departament:"IT solution" ,country: "France", dateOfAdmission: "2022-02-02" },
  { id: 13, name: "William", surname: "Harris", emailCorporative: "william.harris@company.com", salary: 8100, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-10-30" },
  { id: 14, name: "Olivia", surname: "Martin", emailCorporative: "olivia.martin@company.com", salary: 4700, departament:"IT solution" ,country: "UK", dateOfAdmission: "2020-04-12" },
  { id: 15, name: "Christopher", surname: "Thompson", emailCorporative: "christopher.thompson@company.com", salary: 6500, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2019-09-05" },
  { id: 16, name: "Sophia", surname: "Garcia", emailCorporative: "sophia.garcia@company.com", salary: 4900, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-11-21" },
  { id: 17, name: "Anthony", surname: "Martinez", emailCorporative: "anthony.martinez@company.com", salary: 5800, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2022-01-17" },
  { id: 18, name: "Isabella", surname: "Robinson", emailCorporative: "isabella.robinson@company.com", salary: 4600, departament:"IT solution" ,country: "France", dateOfAdmission: "2020-08-29" },
  { id: 19, name: "Matthew", surname: "Clark", emailCorporative: "matthew.clark@company.com", salary: 7000, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-06-08" },
  { id: 20, name: "Abigail", surname: "Rodriguez", emailCorporative: "abigail.rodriguez@company.com", salary: 5200, departament:"IT solution" ,country: "UK", dateOfAdmission: "2019-12-14" },
  { id: 21, name: "Joshua", surname: "Lewis", emailCorporative: "joshua.lewis@company.com", salary: 6400, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2020-03-19" },
  { id: 22, name: "Chloe", surname: "Lee", emailCorporative: "chloe.lee@company.com", salary: 5100, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-09-25" },
  { id: 23, name: "Andrew", surname: "Walker", emailCorporative: "andrew.walker@company.com", salary: 6000, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2022-05-03" },
  { id: 24, name: "Hannah", surname: "Hall", emailCorporative: "hannah.hall@company.com", salary: 4800, departament:"IT solution" ,country: "France", dateOfAdmission: "2020-01-28" },
  { id: 25, name: "Joseph", surname: "Allen", emailCorporative: "joseph.allen@company.com", salary: 7100, departament:"IT solution" ,country: "USA", dateOfAdmission: "2021-07-12" },
  { id: 26, name: "Samantha", surname: "Young", emailCorporative: "samantha.young@company.com", salary: 5000, departament:"IT solution" ,country: "UK", dateOfAdmission: "2022-03-03" },
  { id: 27, name: "Ryan", surname: "King", emailCorporative: "ryan.king@company.com", salary: 6200, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2020-06-15" },
  { id: 28, name: "Elizabeth", surname: "Wright", emailCorporative: "elizabeth.wright@company.com", salary: 4900, departament:"IT solution" ,country: "USA", dateOfAdmission: "2019-11-20" },
  { id: 29, name: "Brandon", surname: "Lopez", emailCorporative: "brandon.lopez@company.com", salary: 5400, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2021-02-17" },
  { id: 30, name: "Mia", surname: "Hill", emailCorporative: "mia.hill@company.com", salary: 4600, departament:"IT solution" ,country: "France", dateOfAdmission: "2020-09-12" },
  { id: 31, name: "Kevin", surname: "Scott", emailCorporative: "kevin.scott@company.com", salary: 6500, departament:"IT solution" ,country: "USA", dateOfAdmission: "2022-04-01" },
  { id: 32, name: "Natalie", surname: "Green", emailCorporative: "natalie.green@company.com", salary: 5200, departament:"IT solution" ,country: "UK", dateOfAdmission: "2021-08-22" },
  { id: 33, name: "Justin", surname: "Adams", emailCorporative: "justin.adams@company.com", salary: 5800, departament:"IT solution" ,country: "Canada", dateOfAdmission: "2020-12-10" },
  { id: 34, name: "Victoria", surname: "Baker", emailCorporative: "victoria.baker@company.com", salary: 4900, departament:"IT solution" ,country: "USA", dateOfAdmission: "2019-05-18" },
  { id: 35, name: "Benjamin", surname: "Nelson", emailCorporative: "benjamin.nelson@company.com", salary: 7100, departament:"IT solution" ,country: "Germany", dateOfAdmission: "2021-10-08" },
  { id: 36, name: "Grace", surname: "Carter", emailCorporative: "grace.carter@company,com", salary: 4700, departament:"IT solution" ,country: "France", dateOfAdmission: "2020-02-25" },
  ]
