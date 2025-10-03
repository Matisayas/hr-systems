export type Department = "HR" | "Engineering" | "Sales" | "Operations";
export type Country = "El Salvador" | "Guatemala" | "Honduras" | "Costa Rica" | "Panamá";

export interface Employee {
  id?: number;
  name: string;
  surname: string;
  emailCorporative: string;
  salary: number;
  country: Country;
  departament: Department;
  dateOfAdmission: string;
}

export const employees: Employee[] = [
  { id: 1, name: "John", surname: "Doe", emailCorporative: "john.doe@empresa.com", salary: 4500, departament: "HR", country: "El Salvador", dateOfAdmission: "2022-03-15" },
  { id: 2, name: "Jane", surname: "Smith", emailCorporative: "jane.smith@empresa.com", salary: 5200, departament: "HR", country: "Guatemala", dateOfAdmission: "2021-07-22" },
  { id: 3, name: "Michael", surname: "Brown", emailCorporative: "michael.brown@empresa.com", salary: 6100, departament: "Engineering", country: "Honduras", dateOfAdmission: "2020-11-05" },
  { id: 4, name: "Emily", surname: "Davis", emailCorporative: "emily.davis@empresa.com", salary: 4800, departament: "Sales", country: "Costa Rica", dateOfAdmission: "2019-08-12" },
  { id: 5, name: "David", surname: "Wilson", emailCorporative: "david.wilson@empresa.com", salary: 7500, departament: "Operations", country: "Panamá", dateOfAdmission: "2023-01-10" },
  { id: 6, name: "Sarah", surname: "Johnson", emailCorporative: "sarah.johnson@empresa.com", salary: 6800, departament: "HR", country: "El Salvador", dateOfAdmission: "2020-05-18" },
  { id: 7, name: "Robert", surname: "Miller", emailCorporative: "robert.miller@empresa.com", salary: 5400, departament: "Engineering", country: "Guatemala", dateOfAdmission: "2021-12-01" },
  { id: 8, name: "Jessica", surname: "Taylor", emailCorporative: "jessica.taylor@empresa.com", salary: 4700, departament: "Sales", country: "Honduras", dateOfAdmission: "2022-06-20" },
  { id: 9, name: "Daniel", surname: "Anderson", emailCorporative: "daniel.anderson@empresa.com", salary: 7200, departament: "Operations", country: "Costa Rica", dateOfAdmission: "2021-09-10" },
  { id: 10, name: "Laura", surname: "Thomas", emailCorporative: "laura.thomas@empresa.com", salary: 5000, departament: "HR", country: "Panamá", dateOfAdmission: "2019-03-25" },
  { id: 11, name: "James", surname: "Jackson", emailCorporative: "james.jackson@empresa.com", salary: 5900, departament: "Engineering", country: "El Salvador", dateOfAdmission: "2020-07-15" },
  { id: 12, name: "Megan", surname: "White", emailCorporative: "megan.white@empresa.com", salary: 5300, departament: "Sales", country: "Guatemala", dateOfAdmission: "2022-02-02" },
  { id: 13, name: "William", surname: "Harris", emailCorporative: "william.harris@empresa.com", salary: 8100, departament: "Operations", country: "Honduras", dateOfAdmission: "2021-10-30" },
  { id: 14, name: "Olivia", surname: "Martin", emailCorporative: "olivia.martin@empresa.com", salary: 4700, departament: "HR", country: "Costa Rica", dateOfAdmission: "2020-04-12" },
  { id: 15, name: "Christopher", surname: "Thompson", emailCorporative: "christopher.thompson@empresa.com", salary: 6500, departament: "Engineering", country: "Panamá", dateOfAdmission: "2019-09-05" },
  { id: 16, name: "Sophia", surname: "Garcia", emailCorporative: "sophia.garcia@empresa.com", salary: 4900, departament: "Sales", country: "El Salvador", dateOfAdmission: "2021-11-21" },
  { id: 17, name: "Anthony", surname: "Martinez", emailCorporative: "anthony.martinez@empresa.com", salary: 5800, departament: "Operations", country: "Guatemala", dateOfAdmission: "2022-01-17" },
  { id: 18, name: "Isabella", surname: "Robinson", emailCorporative: "isabella.robinson@empresa.com", salary: 4600, departament: "HR", country: "Honduras", dateOfAdmission: "2020-08-29" },
  { id: 19, name: "Matthew", surname: "Clark", emailCorporative: "matthew.clark@empresa.com", salary: 7000, departament: "Engineering", country: "Costa Rica", dateOfAdmission: "2021-06-08" },
  { id: 20, name: "Abigail", surname: "Rodriguez", emailCorporative: "abigail.rodriguez@empresa.com", salary: 5200, departament: "Sales", country: "Panamá", dateOfAdmission: "2019-12-14" },
  { id: 21, name: "Joshua", surname: "Lewis", emailCorporative: "joshua.lewis@empresa.com", salary: 6400, departament: "Operations", country: "El Salvador", dateOfAdmission: "2020-03-19" },
  { id: 22, name: "Chloe", surname: "Lee", emailCorporative: "chloe.lee@empresa.com", salary: 5100, departament: "HR", country: "Guatemala", dateOfAdmission: "2021-09-25" },
  { id: 23, name: "Andrew", surname: "Walker", emailCorporative: "andrew.walker@empresa.com", salary: 6000, departament: "Engineering", country: "Honduras", dateOfAdmission: "2022-05-03" },
  { id: 24, name: "Hannah", surname: "Hall", emailCorporative: "hannah.hall@empresa.com", salary: 4800, departament: "Sales", country: "Costa Rica", dateOfAdmission: "2020-01-28" },
  { id: 25, name: "Joseph", surname: "Allen", emailCorporative: "joseph.allen@empresa.com", salary: 7100, departament: "Operations", country: "Panamá", dateOfAdmission: "2021-07-12" },
  { id: 26, name: "Samantha", surname: "Young", emailCorporative: "samantha.young@empresa.com", salary: 5000, departament: "HR", country: "El Salvador", dateOfAdmission: "2022-03-03" },
  { id: 27, name: "Ryan", surname: "King", emailCorporative: "ryan.king@empresa.com", salary: 6200, departament: "Engineering", country: "Guatemala", dateOfAdmission: "2020-06-15" },
  { id: 28, name: "Elizabeth", surname: "Wright", emailCorporative: "elizabeth.wright@empresa.com", salary: 4900, departament: "Sales", country: "Honduras", dateOfAdmission: "2019-11-20" },
  { id: 29, name: "Brandon", surname: "Lopez", emailCorporative: "brandon.lopez@empresa.com", salary: 5400, departament: "Operations", country: "Costa Rica", dateOfAdmission: "2021-02-17" },
  { id: 30, name: "Mia", surname: "Hill", emailCorporative: "mia.hill@empresa.com", salary: 4600, departament: "HR", country: "Panamá", dateOfAdmission: "2020-09-12" },
  { id: 31, name: "Kevin", surname: "Scott", emailCorporative: "kevin.scott@empresa.com", salary: 6500, departament: "Engineering", country: "El Salvador", dateOfAdmission: "2022-04-01" },
  { id: 32, name: "Natalie", surname: "Green", emailCorporative: "natalie.green@empresa.com", salary: 5200, departament: "Sales", country: "Guatemala", dateOfAdmission: "2021-08-22" },
  { id: 33, name: "Justin", surname: "Adams", emailCorporative: "justin.adams@empresa.com", salary: 5800, departament: "Operations", country: "Honduras", dateOfAdmission: "2020-12-10" },
  { id: 34, name: "Victoria", surname: "Baker", emailCorporative: "victoria.baker@empresa.com", salary: 4900, departament: "HR", country: "Costa Rica", dateOfAdmission: "2019-05-18" },
  { id: 35, name: "Benjamin", surname: "Nelson", emailCorporative: "benjamin.nelson@empresa.com", salary: 7100, departament: "Engineering", country: "Panamá", dateOfAdmission: "2021-10-08" },
  { id: 36, name: "Grace", surname: "Carter", emailCorporative: "grace.carter@empresa.com", salary: 4700, departament: "Sales", country: "El Salvador", dateOfAdmission: "2020-02-25" },
  { id: 37, name: "Alexander", surname: "Mitchell", emailCorporative: "alexander.mitchell@empresa.com", salary: 6800, departament: "Operations", country: "Guatemala", dateOfAdmission: "2021-04-17" },
  { id: 38, name: "Ava", surname: "Perez", emailCorporative: "ava.perez@empresa.com", salary: 5300, departament: "HR", country: "Honduras", dateOfAdmission: "2022-08-09" },
  { id: 39, name: "Henry", surname: "Roberts", emailCorporative: "henry.roberts@empresa.com", salary: 7200, departament: "Engineering", country: "Costa Rica", dateOfAdmission: "2020-11-30" },
  { id: 40, name: "Ella", surname: "Turner", emailCorporative: "ella.turner@empresa.com", salary: 4900, departament: "Sales", country: "Panamá", dateOfAdmission: "2019-07-22" },
  { id: 41, name: "Samuel", surname: "Phillips", emailCorporative: "samuel.phillips@empresa.com", salary: 6100, departament: "Operations", country: "El Salvador", dateOfAdmission: "2021-03-14" },
  { id: 42, name: "Charlotte", surname: "Campbell", emailCorporative: "charlotte.campbell@empresa.com", salary: 5400, departament: "HR", country: "Guatemala", dateOfAdmission: "2022-07-05" },
  { id: 43, name: "Jack", surname: "Parker", emailCorporative: "jack.parker@empresa.com", salary: 7900, departament: "Engineering", country: "Honduras", dateOfAdmission: "2020-12-18" },
  { id: 44, name: "Amelia", surname: "Evans", emailCorporative: "amelia.evans@empresa.com", salary: 5200, departament: "Sales", country: "Costa Rica", dateOfAdmission: "2019-09-11" },
  { id: 45, name: "Owen", surname: "Edwards", emailCorporative: "owen.edwards@empresa.com", salary: 6700, departament: "Operations", country: "Panamá", dateOfAdmission: "2021-05-23" },
  { id: 46, name: "Lily", surname: "Collins", emailCorporative: "lily.collins@empresa.com", salary: 4800, departament: "HR", country: "El Salvador", dateOfAdmission: "2022-02-14" },
  { id: 47, name: "Gabriel", surname: "Stewart", emailCorporative: "gabriel.stewart@empresa.com", salary: 6300, departament: "Engineering", country: "Guatemala", dateOfAdmission: "2020-10-07" },
  { id: 48, name: "Zoe", surname: "Sanchez", emailCorporative: "zoe.sanchez@empresa.com", salary: 5500, departament: "Sales", country: "Honduras", dateOfAdmission: "2021-01-29" },
  { id: 49, name: "Julian", surname: "Morris", emailCorporative: "julian.morris@empresa.com", salary: 7100, departament: "Operations", country: "Costa Rica", dateOfAdmission: "2019-06-16" },
  { id: 50, name: "Harper", surname: "Rogers", emailCorporative: "harper.rogers@empresa.com", salary: 5900, departament: "HR", country: "Panamá", dateOfAdmission: "2022-09-27" },
  { id: 51, name: "Lucas", surname: "Reed", emailCorporative: "lucas.reed@empresa.com", salary: 6600, departament: "Engineering", country: "El Salvador", dateOfAdmission: "2020-04-03" },
  { id: 52, name: "Evelyn", surname: "Cook", emailCorporative: "evelyn.cook@empresa.com", salary: 5100, departament: "Sales", country: "Guatemala", dateOfAdmission: "2021-11-19" },
  { id: 53, name: "Nathan", surname: "Morgan", emailCorporative: "nathan.morgan@empresa.com", salary: 7400, departament: "Operations", country: "Honduras", dateOfAdmission: "2022-05-30" },
  { id: 54, name: "Avery", surname: "Bell", emailCorporative: "avery.bell@empresa.com", salary: 5300, departament: "HR", country: "Costa Rica", dateOfAdmission: "2019-08-24" },
  { id: 55, name: "Caleb", surname: "Murphy", emailCorporative: "caleb.murphy@empresa.com", salary: 6800, departament: "Engineering", country: "Panamá", dateOfAdmission: "2020-07-11" },
  { id: 56, name: "Scarlett", surname: "Bailey", emailCorporative: "scarlett.bailey@empresa.com", salary: 5000, departament: "Sales", country: "El Salvador", dateOfAdmission: "2021-12-05" },
  { id: 57, name: "Isaac", surname: "Rivera", emailCorporative: "isaac.rivera@empresa.com", salary: 6200, departament: "Operations", country: "Guatemala", dateOfAdmission: "2022-03-28" },
  { id: 58, name: "Madison", surname: "Cooper", emailCorporative: "madison.cooper@empresa.com", salary: 5700, departament: "HR", country: "Honduras", dateOfAdmission: "2020-09-14" },
  { id: 59, name: "Luke", surname: "Richardson", emailCorporative: "luke.richardson@empresa.com", salary: 7300, departament: "Engineering", country: "Costa Rica", dateOfAdmission: "2019-04-07" },
  { id: 60, name: "Layla", surname: "Cox", emailCorporative: "layla.cox@empresa.com", salary: 4900, departament: "Sales", country: "Panamá", dateOfAdmission: "2021-07-20" },
  { id: 61, name: "Dylan", surname: "Howard", emailCorporative: "dylan.howard@empresa.com", salary: 6500, departament: "Operations", country: "El Salvador", dateOfAdmission: "2022-01-12" },
  { id: 62, name: "Riley", surname: "Ward", emailCorporative: "riley.ward@empresa.com", salary: 5400, departament: "HR", country: "Guatemala", dateOfAdmission: "2020-06-25" },
  { id: 63, name: "Nora", surname: "Torres", emailCorporative: "nora.torres@empresa.com", salary: 7600, departament: "Engineering", country: "Honduras", dateOfAdmission: "2021-02-18" },
  { id: 64, name: "Carter", surname: "Peterson", emailCorporative: "carter.peterson@empresa.com", salary: 5800, departament: "Sales", country: "Costa Rica", dateOfAdmission: "2019-10-31" },
  { id: 65, name: "Hazel", surname: "Gray", emailCorporative: "hazel.gray@empresa.com", salary: 5200, departament: "Operations", country: "Panamá", dateOfAdmission: "2022-04-23" },
  { id: 66, name: "Wyatt", surname: "Ramirez", emailCorporative: "wyatt.ramirez@empresa.com", salary: 6900, departament: "HR", country: "El Salvador", dateOfAdmission: "2020-11-16" },
  { id: 67, name: "Ellie", surname: "James", emailCorporative: "ellie.james@empresa.com", salary: 5500, departament: "Engineering", country: "Guatemala", dateOfAdmission: "2021-08-09" },
  { id: 68, name: "Grayson", surname: "Watson", emailCorporative: "grayson.watson@empresa.com", salary: 7100, departament: "Sales", country: "Honduras", dateOfAdmission: "2022-12-02" },
  { id: 69, name: "Aurora", surname: "Brooks", emailCorporative: "aurora.brooks@empresa.com", salary: 5300, departament: "Operations", country: "Costa Rica", dateOfAdmission: "2019-05-25" },
  { id: 70, name: "Leo", surname: "Sanders", emailCorporative: "leo.sanders@empresa.com", salary: 6700, departament: "HR", country: "Panamá", dateOfAdmission: "2020-02-18" }
];